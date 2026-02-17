import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 1. REGISTRO OBLIGATORIO
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

const AltitudeChart = ({ selectedCountry }) => {
  // 2. CONFIGURACIÓN DE OPCIONES
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#aaa' } },
      x: { grid: { display: false }, ticks: { color: '#aaa' } }
    },
    plugins: { legend: { labels: { color: '#fff' } } }
  };

  const data = {
    labels: ['0m', '500m', '1000m', '1500m', '2000m', '2500m', '3000m', '3500m', '4000m', '4500m+'],
    datasets: [
      {
        label: `${selectedCountry?.properties?.COUNTRY || 'Selecciona...'} (%)`,
        data: [
          selectedCountry?.properties?.share_pct_0 || 0,
          selectedCountry?.properties?.share_pct_500 || 0,
          selectedCountry?.properties?.share_pct_1000 || 0,
          selectedCountry?.properties?.share_pct_1500 || 0,
          selectedCountry?.properties?.share_pct_2000 || 0,
          selectedCountry?.properties?.share_pct_2500 || 0,
          selectedCountry?.properties?.share_pct_3000 || 0,
          selectedCountry?.properties?.share_pct_3500 || 0,
          selectedCountry?.properties?.share_pct_4000 || 0,
          selectedCountry?.properties?.share_pct_plus || 0,
        ],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Avg. SouthAmerica (%)',
        data: [59.22, 25.91, 4.11, 1.71, 1.11, 5.11, 1.09, 1.32, 0.35, 0.02],
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: '10px' }}>
      {selectedCountry ? (
        <Line data={data} options={options} />
      ) : (
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
           <p style={{ color: 'white', opacity: 0.5 }}>Haz clic en un país del mapa</p>
        </div>
      )}
    </div>
  );
};

export default AltitudeChart;