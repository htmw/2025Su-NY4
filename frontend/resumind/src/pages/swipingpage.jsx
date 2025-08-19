// src/pages/swipingpage.jsx
import { useEffect, useState } from 'react';
import CardDeck from '../components/CardDeck';
import { useMatchedJobs } from '../context/MatchedJobsContext';
import { CircularProgress } from '@mui/material';

const SwipingPage = () => {
  const { matchedJobs, addMatchedJob } = useMatchedJobs();
  const cachedJobs = localStorage.getItem('jobList');
  const [jobList, setJobList] = useState(cachedJobs ? JSON.parse(cachedJobs) : []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobList.length > 0) {
      setLoading(false);
      return;
    }
    const fetchJobs = async () => {
      const resumeID = localStorage.getItem('resumeID');
      if (!resumeID) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://ec2-44-204-41-151.compute-1.amazonaws.com:5000/job-recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resumeID }),
        });

        const jobs = await response.json();
        console.log('Received jobs:', jobs);

        if (!Array.isArray(jobs)) {
          console.error('Unexpected jobs format:', jobs);
          setLoading(false);
          return;
        }

        // Add fallback ID if missing
        const jobsWithId = jobs.map((job, i) => ({ ...job, id: job.id || i }));
        const topJobs = jobsWithId.slice(0, 100);
        setJobList(topJobs);
        localStorage.setItem('jobList', JSON.stringify(topJobs));
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch job recommendations:', err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
          <p style={{ marginTop: '1rem', fontSize: '1.1rem', color: '#666' }}>Loading jobs...</p>
        </div>
      ) : (
        <CardDeck matchedJobs={matchedJobs} onMatch={addMatchedJob} jobData={jobList} />
      )}
    </div>
  );
};

export default SwipingPage;