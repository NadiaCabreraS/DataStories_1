import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const PopulationMap = ({ nivelActivo }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const niveles = ['base', '500m', '1000m', '2000m', '3000m', '4000m', '4500m'];

  // EFECTO 1: Inicialización del Mapa
  useEffect(() => {
    if (map.current) return; // Evita duplicar el mapa

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {},
        layers: [{
          id: 'background',
          type: 'background',
          paint: { 'background-color': '#000000' } // Fondo negro mientras cargan los tiles
        }]
      },
      center: [-74, -15], 
      zoom: 3,
      maxZoom: 7 // Bloqueamos en 7 porque borramos el 8
    });
  }, []);



// EFECTO 2: Manejo de Capas (Aquí va el cambio de los tiles)
  useEffect(() => {
    const mapInstance = map.current;
    if (!mapInstance) return;

    const updateLayers = () => {
      const nivelNombre = niveles[nivelActivo];

      // 1. Si la fuente no existe, la creamos con la ruta RELATIVA
      if (!mapInstance.getSource(`source-${nivelNombre}`)) {
        mapInstance.addSource(`source-${nivelNombre}`, {
          type: 'raster',
          // EL CAMBIO CLAVE: El punto '.' antes de /0_tiles
          tiles: [`./0_tiles/${nivelNombre}/{z}/{x}/{y}.png`], 
          tileSize: 256,
        });

        mapInstance.addLayer({
          id: `layer-${nivelNombre}`,
          type: 'raster',
          source: `source-${nivelNombre}`,
          paint: {
            'raster-opacity': 0,
            'raster-opacity-transition': { duration: 500 }
          },
        });
      }

      // 2. Lógica de visibilidad (encender activa, apagar resto)
      niveles.forEach((nivel) => {
        if (mapInstance.getLayer(`layer-${nivel}`)) {
          const targetOpacity = nivel === nivelNombre ? 1 : 0;
          mapInstance.setPaintProperty(`layer-${nivel}`, 'raster-opacity', targetOpacity);
        }
      });
    };

    if (mapInstance.isStyleLoaded()) {
      updateLayers();
    } else {
      mapInstance.once('load', updateLayers);
    }
  }, [nivelActivo]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default PopulationMap;
