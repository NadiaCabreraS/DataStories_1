import React from 'react';

const ControlPanel = ({ nivel, setNivel, etiquetas }) => {
const leyendaItems = [
  { color: '#440154', rango: '0', desc: 'Deshabitado' },
  { color: '#3b528b', rango: '1 - 5k', desc: 'Baja' },
  { color: '#21918c', rango: '5k - 15k', desc: 'Media' },
  { color: '#5ec962', rango: '15k - 25k', desc: 'Alta' },
  { color: '#fde725', rango: '25k - 35k', desc: 'Muy Alta' },
  { color: '#d7191c', rango: '35k+', desc: 'Extrema' },
];

  const cardStyle = {
    pointerEvents: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
      width: '550px', // Ajusta según necesites
      pointerEvents: 'none' 
    }}>
      
      {/* SECCIÓN SLIDER */}
      <div style={{ ...cardStyle, width: '275px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '10px', fontWeight: 'bold', opacity: 0.6 }}>FILTER</span>
          <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>{etiquetas[nivel]}</span>
        </div>

        <input 
          type="range" min="0" max="6" step="1" 
          value={nivel} 
          onChange={(e) => setNivel(parseInt(e.target.value))}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      </div>

      {/* SECCIÓN LEYENDA */}
      <div style={{ ...cardStyle, width: '275px' }}>
        <span style={{ fontSize: '10px', fontWeight: 'bold', opacity: 0.6, marginBottom: '10px' }}>
          DENSITY (hab/km²)
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {leyendaItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '14px', height: '14px', 
                backgroundColor: item.color, 
                borderRadius: '3px' 
              }} />
              <span style={{ fontSize: '11px' }}>{item.rango}</span>
              <span style={{ fontSize: '10px', opacity: 0.4, marginLeft: 'auto' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ControlPanel;