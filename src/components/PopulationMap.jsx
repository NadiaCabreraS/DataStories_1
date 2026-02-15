import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const PopulationMap = ({ nivelActivo }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const niveles = ['base', '500m', '1000m', '2000m', '3000m', '4000m', '4500m'];

  // EFECTO 1: Inicialización del Mapa (Limpio)
useEffect(() => {
  const mapInstance = map.current;
  if (!mapInstance) return;

  const updateLayers = () => {
    const nivelNombre = niveles[nivelActivo];



// EFECTO 2: Manejo de Capas (Lazy Loading)
    // 1. Si la fuente no existe, la creamos justo ahora
    if (!mapInstance.getSource(`source-${nivelNombre}`)) {
      mapInstance.addSource(`source-${nivelNombre}`, {
        type: 'raster',
        tiles: [`/0_tiles/${nivelNombre}/{z}/{x}/{y}.png`], // Cambia a .webp si puedes
        tileSize: 256,
      });

      mapInstance.addLayer({
        id: `layer-${nivelNombre}`,
        type: 'raster',
        source: `source-${nivelNombre}`,
        paint: {
          'raster-opacity': 0, // Empezamos en 0 para la transición
          'raster-opacity-transition': { duration: 500 },
          'raster-resampling': 'linear'
        },
      });
    }

    // 2. Apagamos todas y encendemos solo la activa
    niveles.forEach((nivel) => {
      if (mapInstance.getLayer(`layer-${nivel}`)) {
        const targetOpacity = nivel === nivelNombre ? 1 : 0;
        mapInstance.setPaintProperty(`layer-${nivel}`, 'raster-opacity', targetOpacity);
      }
    });
  };

  // Si el mapa ya cargó, ejecutamos. Si no, esperamos al evento load.
  if (mapInstance.isStyleLoaded()) {
    updateLayers();
  } else {
    mapInstance.once('load', updateLayers);
  }
}, [nivelActivo]);

  // Efecto para reaccionar al cambio del slider
  useEffect(() => {
    if (!map.current) return;

    niveles.forEach((nivel) => {
      const opacity = nivel === niveles[nivelActivo] ? 1 : 0;
      if (map.current.getLayer(`layer-${nivel}`)) {
        map.current.setPaintProperty(`layer-${nivel}`, 'raster-opacity', opacity);
      }
    });
  }, [nivelActivo]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default PopulationMap;
