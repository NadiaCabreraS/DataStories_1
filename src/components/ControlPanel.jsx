import React from 'react';

const ControlPanel = ({ nivel, setNivel, etiquetas }) => {
const leyendaItems = [
  { color: '#4b2a7d', rango: '< 2k' },
    { color: '#4686fb', rango: '2 - 5k'},
  { color: '#1be5b5', rango: '5k - 15k'},
  { color: '#a4fc3c', rango: '15k - 25k' },
  { color: '#fbb938', rango: '25k - 35k' },
  { color: '#ae2e08', rango: '35k+' },
];

  const cardStyle = {
    pointerEvents: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(8px)',
    color: 'white',
    padding: '20px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      gap: '15px', 
      width: '550px', 
      pointerEvents: 'none' 
    }}>
      
      {/* SECCIÓN SLIDER */}
      <div style={{ ...cardStyle, width: '275px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
         
          <span style={{ color: 'white' ,     fontSize: '14.5px', 
    fontWeight: '600', 
    opacity: 0.8, fontFamily: "'Satoshi', sans-serif" }}>{etiquetas[nivel]}</span>
        </div>

        <input 
          type="range" min="0" max="6" step="1" 
          value={nivel} 
          onChange={(e) => setNivel(parseInt(e.target.value))}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      </div>

      {/* CAJA DE LEYENDA COMPLETA */}
<div style={{ 
  pointerEvents: 'auto', 
  backgroundColor: 'rgba(0, 0, 0, 0.15)', 
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  color: 'white', 
  padding: '20px', 
  borderRadius: '16px', 
  width: '350px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  
}}>
  {/* Título de la Leyenda */}
  <span style={{ 
    fontSize: '14px', 
    fontWeight: '600', 
    opacity: 0.8, 
    fontFamily: "'Satoshi', sans-serif",
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '12px' 
  }}>
    Population Density (hab/km²)
  </span>

  {/* CONTENEDOR EN DOS COLUMNAS (GRID) */}
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
  }}>
    {[
 { color: '#4b2a7d', rango: '< 2k' },
    { color: '#4686fb', rango: '2 - 5k'},
  { color: '#1be5b5', rango: '5k - 15k'},
  { color: '#a4fc3c', rango: '15k - 25k' },
  { color: '#fbb938', rango: '25k - 35k' },
  { color: '#ae2e08', rango: '35k+' },
    ].map((item, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ 
          width: '12px', 
          height: '12px', 

          backgroundColor: item.color, 
          borderRadius: '3px',
          border: '1px solid rgba(255,255,255,0.1)'
        }} />
        <span style={{ fontSize: '11px', fontWeight: '400', fontFamily: "'Satoshi', sans-serif" }}>
          {item.rango}
        </span>
      </div>
    ))}
  </div>
</div>
</div>


  );
};

export default ControlPanel;