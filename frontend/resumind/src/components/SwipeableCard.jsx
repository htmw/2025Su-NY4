import React from 'react';
import { motion, useAnimation } from 'framer-motion';

const SwipeableCard = ({ children, index, onSwipe }) => {
  const animation = useAnimation();

  const handleDragEnd = (event, info) => {
    const { offset, velocity } = info;

    if (offset.x > 100 || velocity.x > 500) {
      animation.start({ x: 1000, opacity: 0 }).then(() => onSwipe('right', index));
    } else if (offset.x < -100 || velocity.x < -500) {
      animation.start({ x: -1000, opacity: 0 }).then(() => onSwipe('left', index));
    } else {
      animation.start({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      className="swipe-card"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={animation}
      whileTap={{ cursor: 'grabbing' }}
      style={{
        zIndex: 100 - index,
        position: 'absolute',
        top: index * 5,
        left: index * 5,
      }}
    >
      {children}
    </motion.div>
  );
};

export default SwipeableCard;