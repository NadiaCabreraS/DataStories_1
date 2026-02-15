import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const PopulationMap = ({ nivelActivo }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Nombres EXACTOS de tus carpetas dentro de: public/0_tiles/
  const niveles = ['base', '500', '1000', '2000', '3000', '4000', '4500'];

  // EFECTO 1: Inicialización del mapa (una sola vez)
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-74, -15],
      zoom: 3,
      maxZoom: 7, // si tus tiles llegan hasta z=7
    });
  }, []);

  // EFECTO 2: Crear/activar capas según nivelActivo
  useEffect(() => {
    const mapInstance = map.current;
    if (!mapInstance) return;

    const updateLayers = () => {
      const nivelNombre = niveles[nivelActivo];
      const BASE = import.meta.env.BASE_URL; // en GH Pages: "/DataStories_1/"

      const sourceId = `source-${nivelNombre}`;
      const layerId = `layer-${nivelNombre}`;

      // 1) Crear source + layer si no existen
      if (!mapInstance.getSource(sourceId)) {
        mapInstance.addSource(sourceId, {
          type: 'raster',
          tiles: [`${BASE}0_tiles/${nivelNombre}/{z}/{x}/{y}.png`],
          tileSize: 256,
        });

        mapInstance.addLayer({
          id: layerId,
          type: 'raster',
          source: sourceId,
          paint: {
            'raster-opacity': 0,
            'raster-opacity-transition': { duration: 500 },
          },
        });
      }

      // 2) Encender capa activa, apagar el resto
      niveles.forEach((nivel) => {
        const id = `layer-${nivel}`;
        if (mapInstance.getLayer(id)) {
          mapInstance.setPaintProperty(id, 'raster-opacity', nivel === nivelNombre ? 1 : 0);
        }
      });
    };

    if (mapInstance.isStyleLoaded()) updateLayers();
    else mapInstance.once('load', updateLayers);
  }, [nivelActivo]); // (niveles no cambia)

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default PopulationMap;