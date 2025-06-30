import React, { useState } from 'react';
import SwipeableCard from './SwipeableCard';
import { Box, Typography, Button, List, ListItem, ListItemText, AppBar, Toolbar, Avatar, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const cardData = [
  { id: 1, title: 'Frontend Developer at Meta' },
  { id: 2, title: 'Full Stack Role at Google' },
  { id: 3, title: 'Software Engineer at Netflix' },
  { id: 4, title: 'React Intern at Shopify' },
];


const CardDeck = () => {
  const [cards, setCards] = useState(cardData);
  const [liked, setLiked] = useState([]);

  const handleSwipe = (direction, index) => {
    const swiped = cards[index];
    if (direction === 'right') {
      setLiked((prev) => [...prev, swiped]);
    }
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="deck-layout">
      <Box sx={{ width: '65%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" gutterBottom>Jobs</Typography>
        <Box sx={{ width: 320, height: 440, position: 'relative' }}>
          {cards.map((card, i) => (
            <SwipeableCard key={card.id} index={i} onSwipe={handleSwipe}>
              <Card sx={{ maxWidth: 320, position: 'absolute' }}>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{card.title[0]}</Avatar>}
                  title={card.title}
                  subheader={card.city || 'Available Now'}
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardMedia
                  component="img"
                  height="140"
                  image="https://source.unsplash.com/random/320x140?job"
                  alt="Job visual"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {card.desc || 'Explore this opportunity at a top-tier company with great culture and growth.'}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </SwipeableCard>
          ))}
        </Box>
      </Box>

      <Box sx={{ width: '35%', height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ mr: 1 }}>E</Avatar>
              <Typography variant="subtitle1">ericlantz</Typography>
            </Box>
            <Button color="primary" size="small">Logout</Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          <Typography variant="h6" gutterBottom>Matches</Typography>
          <List>
            {liked.map((job) => (
              <ListItem key={job.id} sx={{ mb: 1, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                <ListItemText primary={job.title} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </div>
  );
};

export default CardDeck;