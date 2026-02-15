import React, { useState } from 'react';
import PopulationMap from './components/PopulationMap.jsx';

function App() {
  const [nivel, setNivel] = useState(0);
  const etiquetas = ['Toda Latam', '+500m', '+1000m', '+2000m', '+3000m', '+4000m', '+4500m'];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#000' }}>
      
      {/* El Mapa */}
      <PopulationMap nivelActivo={nivel} />

      {/* Interfaz del Slider */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '12px',
        textAlign: 'center', fontFamily: 'sans-serif', minWidth: '300px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Altitud: {etiquetas[nivel]}</h3>
        <input 
          type="range" min="0" max="6" step="1" 
          value={nivel} 
          onChange={(e) => setNivel(parseInt(e.target.value))}
          style={{ width: '100%', cursor: 'pointer' }}
        />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Desliza para filtrar población</p>
      </div>

    </div>
  );
}

export default App;