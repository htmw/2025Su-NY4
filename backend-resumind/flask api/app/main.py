from flask import Flask, request, jsonify
import os, json, uuid, spacy
import pandas as pd
from pymongo import MongoClient
import openpyxl
from flask_cors import CORS
from werkzeug.utils import secure_filename
import preprocessing_module as preprocessing_module
import boto3, sagemaker
from sagemaker.huggingface import HuggingFaceModel

print("THIS IS THE RIGHT FILE.")

app = Flask(__name__)
# app.run(host='0.0.0.0', port=5000, debug=True)

# print("Registered routes:")
# for rule in app.url_map.iter_rules():
#    print(rule)


# mongodb connection
client = MongoClient('mongodb://localhost:27017/')
db = client.get_database('resume_db')
collection = db['data']

#temp storage folder
UPLOAD_FOLDER = 'temp_storage'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# load spacy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("SpaCy model 'en_core_web_sm' not found. Downloading...")
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# sagemaker
try:
    role = "arn:aws:iam::695911679772:role/sagemaker-execution-role"
except ValueError:
    iam = boto3.client('iam')
    role = "arn:aws:iam::695911679772:role/sagemaker-execution-role"
# hugging face hub config
hub = {
    'HF_MODEL_ID': 'sarahwierzbicki/results',
    'HF_TASK': 'text-classification'
}
huggingface_model = HuggingFaceModel(
    transformers_version='4.49.0',
    pytorch_version='2.6.0',
    py_version='py312',
    env=hub,
    role=role,
)


# deploy model to SageMaker Inference
# predictor = huggingface_model.deploy(
#	initial_instance_count=1, # number of instances
#	instance_type='ml.t2.medium' # ec2 instance type
# )

# process resume
@app.route('/process-resume', methods=['POST'])
def handle_process_resume():
    if 'file' not in request.files:
        return jsonify({'error': "No file"}), 400

    file = request.files['file']

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        resume_text = ""
        if filename.lower().endswith('.pdf'):
            resume_text = preprocessing_module.get_pdf_text(file_path)
        elif filename.lower.endswith('.docx'):
            resume_text = preprocessing_module.get_docx_text(file_path)
        else:
            return jsonify({"Error": "Unsupported file type. Please upload either PDF or DOCX format."}), 400

        os.remove(file_path)

        return jsonify({resume_text}), 200
    # create random unique resumeid
    resume_id = str(uuid.uuid4())
    resume_text = request.json.get("resume_text")
    doc = preprocessing_module.process(resume_text)
    resume_data = {"parsed_resume": doc, "resumeID": resume_id, }
    collection.insert_one(resume_data)
    # resume text will be returned and stored


# read job excel file
excel_file = "jobpostingsfinalcsv.xlsx"
job_data_path = "../data/jobpostingsfinalcsv.xlsx"
df_jobs = pd.read_excel(job_data_path, engine='openpyxl')


# route for prediction
@app.route('/job-recommendations', methods=['GET'])
def predict_category():
    try:
        data = request.get_json()
        resumeID = data.get('resumeID')

        resume_data = collection.find_one({'_id': resumeID})
        predict_resume = resume_data.get('parsed_resume')

        input_data = {'inputs': predict_resume}
        # call model for inference
        response = predictor.predict(input_data)
        
        #get label (category as string)
        category_result = response[0]['label']
        # match with job csv
        match_df = df_jobs.loc[df_jobs['Category'] == category_result]
        match_list = match_df.to_dict(orient='records')
        
        return jsonify(match_list)

    except Exception as e:
        app.logger.error(f"Error during predicting: {e}")
        return jsonify({'error': "Error occured!"}), 500


# run flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(rule)




