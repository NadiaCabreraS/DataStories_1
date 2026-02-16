
import React from 'react';

const SidebarCard = ({ titulo = "Sin Título", descripcion = "", etiquetas = [] }) => {
  return (
    <article 
    style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.45)', // Negro con transparencia
        backdropFilter: 'blur(12px)',        // Efecto de vidrio esmerilado
        WebkitBackdropFilter: 'blur(12px)',  // Compatibilidad para Safari
        color: 'white',                      // ¡Texto blanco para que se lea!
        padding: '24px', 
        borderRadius: '16px', 
        width: '500px', 

        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        pointerEvents: 'auto',
        border: '1px solid rgba(255, 255, 255, 0.1)' // Borde sutil brillante
    }}
    >
<time style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '10px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
    FUENTE: WORLDPOP / CARTO 2024
  </time>

  <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
    {titulo}
  </h3>

  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
    {descripcion}
  </p>
  
  {/* Etiquetas (Badges) ajustadas al estilo oscuro */}
  <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    {etiquetas.map((tag, index) => (
      <span key={index} style={{ 
        backgroundColor: 'rgba(59, 130, 246, 0.2)', 
        color: '#60a5fa', 
        padding: '4px 10px', 
        borderRadius: '6px', 
        fontSize: '14px', 
        border: '1px solid rgba(96, 165, 250, 0.3)' 
      }}>
        {tag}
      </span>
    ))}
  </div>
</article>
  );
};

export default SidebarCard;