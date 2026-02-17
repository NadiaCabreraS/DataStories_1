import React from 'react';

const Title = () => {
  const headerStyle = {
    pointerEvents: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // El negro transparente que querías
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    color: 'white',
    padding: '25px',
    borderRadius: '16px',
    width: '500px',

    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  return (
    <header style={headerStyle}>
      <h1 style={{ 
        margin: 0, 
        fontWeight: 600, 
        fontFamily: "'Satoshi', sans-serif",
        fontSize: '45px', 
        textTransform: 'uppercase',
        lineHeight: '1.1',
        letterSpacing: '-1px'
      }}>
        Life at <span style={{ color: '#3b82f6' }}>Altitude</span>
      </h1>
      <h2 style={{ 
        margin: '8px 0 0 0', 
        fontWeight: 400, 
        fontSize: '16px', 
        
        fontFamily: "'Satoshi', sans-serif",
        letterSpacing: '1px',
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: '1.5'
      }}>
        A visual exploration of elevation and settlement in the Andes
      </h2>
    </header>
  );
};

export default Title;