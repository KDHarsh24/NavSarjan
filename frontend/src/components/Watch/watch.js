import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const AnalogRolex = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Calculate angles for the clock hands
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondAngle = seconds * 6; // 360° / 60 = 6° per second
  const minuteAngle = minutes * 6 + seconds * 0.1; // Extra rotation for smoother movement
  const hourAngle = (hours % 12) * 30 + minutes * 0.5; // 360° / 12 = 30° per hour

  return (
    <Box
      sx={{
        position: 'relative',
        width: 80,
        height: 80,
        borderRadius: '50%',
        border: '10px solid #4CAF50', // Rolex green
        background: 'radial-gradient(circle, #111 70%, #222)',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Clock Hands */}
      <Box
        sx={{
          position: 'absolute',
          width: 3,
          height: 26,
          backgroundColor: '#fff',
          transformOrigin: '50% 100%',
          transform: `rotate(${secondAngle}deg)`,
          transition: 'transform 0.05s linear',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 6,
          height: 80,
          backgroundColor: '#FFD700', // Gold for Rolex vibe
          transformOrigin: '50% 100%',
          transform: `rotate(${minuteAngle}deg)`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 3,
          height: 20,
          backgroundColor: '#FFD700', // Gold for Rolex vibe
          transformOrigin: '50% 100%',
          transform: `rotate(${hourAngle}deg)`,
        }}
      />

      {/* Clock Center */}
      <Box
        sx={{
          position: 'absolute',
          width: 7,
          height: 6.6,
          borderRadius: '50%',
          backgroundColor: '#FFD700', // Gold
          zIndex: 2,
        }}
      />

      {/* Clock Ticks */}
      {Array.from({ length: 12 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: 1,
            height: 6,
            backgroundColor: '#fff',
            transformOrigin: '50% 150%',
            transform: `rotate(${index * 30}deg)`,
          }}
        />
      ))}
    </Box>
  );
};

export default AnalogRolex;
