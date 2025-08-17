import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem } from '@mui/material';
import { useMatchedJobs } from '../context/MatchedJobsContext';

const MatchesPage = () => {
  const { matchedJobs } = useMatchedJobs();
  const [searchTerm, setSearchTerm] = useState('')
  console.log('matchedJobs:', matchedJobs);

  const filteredJobs = matchedJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 4 }}>
        Matched Jobs
      </Typography>
      <TextField
        type="text"
        label="Search matched jobs..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <List>
        {filteredJobs.map((job, i) => (
          <ListItem key={i} sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
            <Typography variant="h6">{job.title}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Match: {job.match || '85%'} | Response Likelihood: {job.likelihood || 'High'}
            </Typography>
            <Button variant="contained" color="primary">
              Apply Now
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default MatchesPage;
