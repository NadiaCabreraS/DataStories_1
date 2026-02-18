import React, { useState } from 'react';
import PopulationMap from './components/PopulationMap.jsx';
import SidebarCard from './components/SidebarCard.jsx';
import Title from './components/Title.jsx';
import AltitudeChart from './components/AltitudeChart.jsx';

import countrydata from './assets/data_complete.json';
import sudamericastats from  './assets/sudamerica_stats.json';
import ControlPanel from './components/ControlPanel.jsx';
import WelcomeModal from './components/WelcomeModal.jsx';


function App() {
  const [nivel, setNivel] = useState(0);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const etiquetas = ['+0m (All of South America)', '+500m', '+1000m', '+2000m', '+3000m', '+4000m', '+4500m'];
  const [showModal, setShowModal] = useState(true); //

 
  return (
    // CONTENEDOR RAIZ: Sin nada de estilos que hereden
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'black', overflow: 'hidden' }}>
      

    {/* WELCOME MODAL */}
      <WelcomeModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />

      {/* CAPA 1: EL MAPA (Abajo) */}
      <section style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <PopulationMap nivelActivo={nivel} 
        dataGeo={countrydata} 
        onSeleccionarPais={setPaisSeleccionado}
        paisSeleccionado={paisSeleccionado}
          />
      </section>

      {/* CAPA 2: LA INTERFAZ (Arriba) */}
      {/* Usamos un zIndex mucho más alto y fixed para que no dependa del flujo del mapa */}
          <nav
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '520px',
              height: '100dvh',
              zIndex: 9999,
              pointerEvents: 'none',
              padding: 0,            // importante: el padding lo metemos adentro del wrapper escalado
            }}
          >
            {/* Wrapper escalado */}
            <div
              style={{
                transform: 'scale(var(--ui-scale))',
                transformOrigin: 'top left',
                width: 'calc(520px / var(--ui-scale))',   // compensa el scale para que “ocupe” lo mismo
                height: 'calc(100dvh / var(--ui-scale))',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '25px',
                boxSizing: 'border-box',
                alignItems: 'flex-start',
              }}
            >
      
        
        {/* CAJA 1: TITULO */}
        
        <Title />

        {/* CAJA 2: SIDEBAR CARD */}
        <div style={{ pointerEvents: 'auto',  width: '200px' }}>
          <SidebarCard 
            
            descripcion="The Andes shape the landscape of Latin America, influencing its terrain and where people settle from low valleys to high mountain regions. Few places in the world sustain large populations above 2,000 meters, yet across Latin America the Andean range makes high-elevation living a defining feature of the territory."
            etiquetas={['South America', 'Altitude', 'Population', 'Density', 'Andean Range']}
          />
        </div>

        

        <ControlPanel 
        nivel={nivel} 
        setNivel={setNivel} 
        etiquetas={etiquetas} 
      />

  

        {/* ALTITUDE CHART */}
        <div style={{ 
        pointerEvents: 'auto', 
        marginTop: '20px', 
        maxWidth: '550px',
         height: 'clamp(240px, 32vh, 380px)', // <--- VITAL: Ponle píxeles fijos para probar
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Un fondo gris oscuro para verlo
        borderRadius: '12px'
}}>
          
          <AltitudeChart 
            selectedCountry={paisSeleccionado} 
            
          />
        </div>


          {/* CREDITS */}
              <div style={{ 
          marginTop: '12px', 
          padding: '0 5px', // Un poco de alineación con el borde del gráfico
          textAlign: 'left' 
        }}>
          <p style={{ 
            margin: 0,
            fontFamily: "'Satoshi', sans-serif", 
            fontSize: '11px', 
            color: 'rgba(255, 255, 255, 0.5)', // Muy sutil para que no distraiga
            letterSpacing: '0.5px',
            lineHeight: '1.4'
          }}>
            Population Data: GHS-POP R2023A - GHS population grid multitemporal (1975-2030).European Commission, Joint Research Centre (JRC) 
             
                          Elevation Data: USGS GMTED2010 (Danielson & Gesch, 2011). Processing by HELCOM Metadata Catalogue.<br />
            
          </p>
        </div>
          </div>
      </nav>
    </div>
  );
}

export default App;