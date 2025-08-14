import { useState, useEffect } from 'react';
import { Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { motion } from 'framer-motion';

const getSwipedLeftJobs = () => {
  const stored = localStorage.getItem('swipedLeftJobs');
  return stored ? JSON.parse(stored) : [];
};

const saveSwipedLeftJob = (jobId) => {
  const current = getSwipedLeftJobs();
  if (!current.includes(jobId)) {
    const updated = [...current, jobId];
    localStorage.setItem('swipedLeftJobs', JSON.stringify(updated));
  }
};

const CardDeck = ({ onMatch = () => {}, matchedJobs = [], jobData = [] }) => {
  const [cards, setCards] = useState(() => {
    const swipedLeft = getSwipedLeftJobs();
    return jobData.filter(
      (job) =>
        !matchedJobs.some((match) => Number(match.id) === Number(job.id)) &&
        !swipedLeft.includes(Number(job.id))
    );
  });

  useEffect(() => {
    const swipedLeft = getSwipedLeftJobs();
    setCards(
      jobData.filter(
        (job) =>
          !matchedJobs.some((match) => Number(match.id) === Number(job.id)) &&
          !swipedLeft.includes(Number(job.id))
      )
    );
  }, [jobData, matchedJobs]);

  const handleAction = (direction) => {
    const currentCard = cards[0];
    if (!currentCard) return;

    if (direction === 'right') {
      onMatch({ ...currentCard, match: '90%', likelihood: 'High' });
      console.log(`Matched with: ${currentCard.title}`);
    }

    if (direction === 'left') {
      saveSwipedLeftJob(Number(currentCard.id));
    }

    // Remove the matched card directly from the state
    setCards((prev) => prev.filter((card, idx) => idx !== 0));
  };

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        height: '100vh',
        padding: '2rem',
        boxSizing: 'border-box',
        width: '100%',
      }}>
      {cards.length > 0 ? (
        <>
          <Typography variant="h4" gutterBottom align="center">Jobs</Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center" fontStyle={'italic'} sx={{ mb: 4 }}>Swipe left to reject, right to match</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ position: 'relative', width: '500px', height: '250px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  drag={index === 0 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(event, info) => {
                    if (index === 0) {
                      if (info.offset.x < -100) handleAction('left');
                      else if (info.offset.x > 100) handleAction('right');
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    width: '500px',
                    height: '100%',
                    borderRadius: 16,
                    boxShadow: '0 2px 10px rgba(76, 76, 76, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    textAlign: 'center',
                    cursor: index === 0 ? 'grab' : 'default',
                    zIndex: cards.length - index,
                  }}
                >
                  <Typography variant="subtitle2" color="primary">Job Opportunity</Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>{card.title}</Typography>
                  <div style={{
                    marginTop: '8px',
                    fontSize: '14px',
                    color: 'rgba(0, 0, 0, 0.6)',
                    height: '80px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {card.description || 'Explore this opportunity at a top-tier company with great culture and growth.'}
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '80px', justifyContent: 'center' }}>
              <IconButton
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  boxShadow: 3,
                  width: 60,
                  height: 60,
                }}
                onClick={() => handleAction('left')}
              >
                <ThumbDownIcon color="error" />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  boxShadow: 3,
                  width: 60,
                  height: 60,
                }}
                onClick={() => handleAction('right')}
              >
                <ThumbUpIcon color="success" />
              </IconButton>
            </div>
          </div>
        </>
      ) : (
        <Typography variant="h6">No more jobs to show!</Typography>
      )}
      </div>
    </>
  );
};

export default CardDeck;