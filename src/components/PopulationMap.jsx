import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// 1. Movemos niveles aquí afuera para que todos los efectos puedan verlo
const NIVELES = ['base', '500', '1000', '2000', '3000', '4000', '4500'];

const PopulationMap = ({ nivelActivo, dataGeo, onSeleccionarPais }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // EFECTO 1: Inicialización del mapa (una sola vez)
  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-74, -15],
      zoom: 3.5,
      maxZoom: 7, 
      attributionControl: false
    });
  }, []);

  // EFECTO 2: Capa de Países (GeoJSON) y Clics
  useEffect(() => {
    const mapInstance = map.current;
    if (!mapInstance || !dataGeo) return;

    const setupGeoJson = () => {
      if (!mapInstance.getSource('countries-source')) {
        mapInstance.addSource('countries-source', { type: 'geojson', data: dataGeo });
        mapInstance.addLayer({
          id: 'paises-layer',
          type: 'fill',
          source: 'countries-source',
          paint: {
            'fill-color': '#ff0000', // Rojo temporal para probar
            'fill-opacity': 0.0 
          }
        });

        mapInstance.on('click', 'paises-layer', (e) => {
          onSeleccionarPais(e.features[0]);
        });
      }
    };

    if (mapInstance.isStyleLoaded()) setupGeoJson();
    else mapInstance.once('load', setupGeoJson);
  }, [dataGeo]);

  // EFECTO 3: Control de Capas Raster (Tiles)
  useEffect(() => {
    const mapInstance = map.current;
    if (!mapInstance) return;

    const updateLayers = () => {
      const nivelNombre = NIVELES[nivelActivo]; // Ahora sí encontrará NIVELES
      const BASE = import.meta.env.BASE_URL;
      const sourceId = `source-${nivelNombre}`;
      const layerId = `layer-${nivelNombre}`;

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
            'raster-opacity-transition': { duration: 500 }
          },
        }, 'paises-layer'); // El segundo argumento asegura que los países queden ARRIBA
      }

      NIVELES.forEach((nivel) => {
        const id = `layer-${nivel}`;
        if (mapInstance.getLayer(id)) {
          mapInstance.setPaintProperty(id, 'raster-opacity', nivel === nivelNombre ? 1 : 0);
        }
      });
    };

    if (mapInstance.isStyleLoaded()) updateLayers();
    else mapInstance.once('load', updateLayers);
  }, [nivelActivo]);

  return <div ref={mapContainer} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0}} />;
};

export default PopulationMap;