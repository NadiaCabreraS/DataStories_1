import React, { useState } from 'react';
import PopulationMap from './components/PopulationMap.jsx';
import SidebarCard from './components/SidebarCard.jsx';
import Title from './components/Title.jsx';
import AltitudeChart from './components/AltitudeChart.jsx';

import countrydata from './assets/data_complete.json';
import sudamericastats from  './assets/sudamerica_stats.json';
import ControlPanel from './components/ControlPanel.jsx';


function App() {
  const [nivel, setNivel] = useState(0);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const etiquetas = ['+0m (All of South America)', '+500m', '+1000m', '+2000m', '+3000m', '+4000m', '+4500m'];

  return (
    // CONTENEDOR RAIZ: Sin nada de estilos que hereden
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'black', overflow: 'hidden' }}>
      
      {/* CAPA 1: EL MAPA (Abajo) */}
      <section style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <PopulationMap nivelActivo={nivel} 
        dataGeo={countrydata} 
        onSeleccionarPais={setPaisSeleccionado}
          />
      </section>

      {/* CAPA 2: LA INTERFAZ (Arriba) */}
      {/* Usamos un zIndex mucho más alto y fixed para que no dependa del flujo del mapa */}
      <nav 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '500px', 
          height: '100vh', 
          zIndex: 9999, 
          pointerEvents: 'none', // Permite tocar el mapa en zonas vacías
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px',
          padding: '40px'
        }}
      >
        
        {/* CAJA 1: TITULO */}
        
        <Title />

        {/* CAJA 2: SIDEBAR CARD */}
        <div style={{ pointerEvents: 'auto', width: '350px' }}>
          <SidebarCard 
            titulo="About the project"
            descripcion="The Andes shape the landscape of Latin America, influencing its terrain and where people settle from low valleys to high mountain regions. Few places in the world sustain large populations above 2,000 meters, yet across Latin America the Andean range makes high-elevation living a defining feature of the territory."
            etiquetas={['South America', 'Altitud', 'Population', 'Density']}
          />
        </div>

        <ControlPanel 
        nivel={nivel} 
        setNivel={setNivel} 
        etiquetas={etiquetas} 
      />

  

        {/* PASO C: EL CUADRO NUEVO (Abajo del slider) */}
        <div style={{ pointerEvents: 'auto', marginTop: '20px', width: '550px',height: '400px', // <--- VITAL: Ponle píxeles fijos para probar
  backgroundColor: 'rgba(255, 255, 255, 0.05)', // Un fondo gris oscuro para verlo
  borderRadius: '12px'
}}>
          {/* Le pasamos el país que guardamos en el Paso A */}
          <AltitudeChart 
            selectedCountry={paisSeleccionado} 
            
          />
        </div>


      </nav>
    </div>
  );
}

export default App;