import React from 'react';

const WelcomeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000, // Por encima de todo
      padding: '20px',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        maxWidth: '600px',
        backgroundColor: '#1a1a1a',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <h1 style={{ 
          fontFamily: 'Satoshi, sans-serif', 
          fontSize: '2rem', 
          color: '#FFF', 
          marginBottom: '20px' 
        }}>
          LIFE AT <span style={{ color: '#3b82f6' }}>ALTITUDE</span>
        </h1>
        
        <p style={{ 
          fontFamily: 'Satoshi, sans-serif', 
          lineHeight: '1.6', 
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '1.2rem',
          marginBottom: '30px'
        }}>
          Discover how population distribution changes with elevation across South America and the Andes. <br />
          <br />
          </p>
          <ul style={{
                fontFamily: 'Satoshi, sans-serif',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                marginBottom: '30px',
                paddingLeft: '20px'
                }}>
                <li>Move the <strong>altitude slider</strong> to reveal where people live at different elevations </li>
                <li><strong>Click a country</strong> to see its distribution profile.</li>
                </ul>

        <button 
          onClick={onClose}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;