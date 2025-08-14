import SwipingPage from './pages/swipingpage';
import MatchesPage from './pages/matchespage';
import logo from './ResuMind_Logo.png';
import './App.css';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import { Container, Box, Typography, TextField, Button, List, ListItem } from '@mui/material';
import { useCallback } from 'react';

function App() {

  const handleResumeUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://ec2-13-219-80-203.compute-1.amazonaws.com:5000/process-resume', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Resume processed:', data);

      const resumeID = data.resumeID;
      if (resumeID) {
        localStorage.setItem('resumeID', resumeID);
      }
    } catch (err) {
      console.error('Failed to process resume:', err);
    }
  }, []);

  const renderHomePage = () => (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Box component="header" sx={{ mb: 4 }}>
        <Box
          component="img"
          src={logo}
          alt="ResuMind Logo"
          sx={{ height: 80, mb: 2 }}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          <Box component="span" sx={{ color: 'black' }}>Resu</Box>
          <Box component="span" sx={{ color: '#007bff' }}>Mind</Box>
        </Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: 'italic', mb: 3 }}>
          It's like Tinder... but for job searching!
        </Typography>
      </Box>

      <Box component="section" sx={{ textAlign: 'left', mb: 5 }}>
        <Typography paragraph>
          Whether you are actively or passively searching for a job, looking for new opportunities can be overwhelming due to:
        </Typography>
        <List sx={{ listStyleType: 'disc', pl: 4, mb: 2 }}>
          <ListItem sx={{ display: 'list-item', pl: 0 }}>High volume of listings on job sites such as Indeed, LinkedIn, Monster</ListItem>
          <ListItem sx={{ display: 'list-item', pl: 0 }}>Lack of matching/relevant skills</ListItem>
          <ListItem sx={{ display: 'list-item', pl: 0 }}>Fake job postings</ListItem>
        </List>
        <Typography paragraph>
          There is a clear need for a smarter, more personalized approach to job discovery—one that truly understands the applicant, while making the job selection process simple and clear.
        </Typography>
        <Typography paragraph>
          ResuMind is an AI-powered job assistant that personalizes the job search experience for job seekers who struggle to find roles that match their skills and career goals. Our application uses natural language processing to recommend verified job opportunities and helps users understand how closely they fit the role.
        </Typography>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item', pl: 0 }}>Reduced job search time</ListItem>
          <ListItem sx={{ display: 'list-item', pl: 0 }}>Skill match insights</ListItem>
          <ListItem sx={{ display: 'list-item', pl: 0 }}>Resume feedback</ListItem>
          <ListItem sx={{ display: 'list-item', pl: 0 }}>Interview prep</ListItem>
        </List>
      </Box>

      <Box component="section" sx={{ mb: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          <Box component="span" sx={{ color: 'black' }}>Your </Box>
          <Box component="span" sx={{ color: '#007bff' }}>Profile</Box>
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: '0 auto' }}>
          <TextField label="Your Name" variant="outlined" />
          {/* <TextField label="Job Title / Aspiring Role" variant="outlined" /> */}
          <Box sx={{ display: 'flex', gap: 2, mt: 1, margin: '0 auto' }}>
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={handleResumeUpload}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => document.getElementById('resume-upload').click()}
            >
              Upload Resume
            </Button>
          </Box>
        </Box>
      </Box>

      <Box component="footer" sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          <Box component="span" sx={{ color: 'black' }}>What People Are </Box>
          <Box component="span" sx={{ color: '#007bff' }}>Saying</Box>
        </Typography>
        <Typography>"Landed my dream job in just 2 weeks!" – Sarah K.</Typography>
        <Typography>"Finally, job hunting feels easy and smart." – Jamal B.</Typography>
        <Typography>"I understood why I wasn’t getting interviews!" – Priya M.</Typography>
      </Box>
    </Container>
  );


  return (
    <Router>
      <div className="main-container">
        <Navbar />
        <Routes>
          <Route path="/" element={renderHomePage()} />
          <Route path="/search" element={<SwipingPage />} />
          <Route path="/matches" element={<MatchesPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;