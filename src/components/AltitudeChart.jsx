import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SA_DATA = [59.22, 25.91, 4.11, 1.71, 1.11, 5.11, 1.09, 1.32, 0.35, 0.02];

const AltitudeChart = ({ selectedCountry }) => {
  const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { callback: (v) => `${v}%`, color: '#aaa', font: { size: 11 }  },
      grid: { color: 'rgba(255,255,255,0.1)' },
    },
    x: {
      ticks: { color: '#aaa', autoSkip: false,  maxRotation: 45, minRotation: 45, font: { size: 11 } },
      grid: { display: false }
    }
  },
  plugins: {
    legend: { labels: { color: '#fff' } },
    tooltip: {
      callbacks: {
        title: (items) => `Altitude: ${items[0].label}`,
        label: (item) => `${item.dataset.label}: ${item.parsed.y.toFixed(1)}%`,
      }
    }
  }
};

  const countryName = selectedCountry?.properties?.COUNTRY || 'South America (preview)';

  const countryData = selectedCountry
    ? [
        selectedCountry?.properties?.share_pct_0 ?? 0,
        selectedCountry?.properties?.share_pct_500 ?? 0,
        selectedCountry?.properties?.share_pct_1000 ?? 0,
        selectedCountry?.properties?.share_pct_1500 ?? 0,
        selectedCountry?.properties?.share_pct_2000 ?? 0,
        selectedCountry?.properties?.share_pct_2500 ?? 0,
        selectedCountry?.properties?.share_pct_3000 ?? 0,
        selectedCountry?.properties?.share_pct_3500 ?? 0,
        selectedCountry?.properties?.share_pct_4000 ?? 0,
        selectedCountry?.properties?.share_pct_plus ?? 0,
      ]
    : SA_DATA;

  const labels = [
  '0–500m','500–1000m','1000–1500m','1500–2000m','2000–2500m',
  '2500–3000m','3000–3500m','3500–4000m','4000–4500m','4500m+'
];

const data = {
  labels,
  datasets: [
    // 1) BARRAS: país
    {
      type: 'bar',
      label: `${countryName} (%)`,
      data: countryData,
      backgroundColor: 'rgba(59, 130, 246, 0.35)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1,
      barPercentage: 0.9,
      categoryPercentage: 0.9,
    },

    // 2) LÍNEA: promedio regional overlay
    {
      type: 'line',
      label: 'Avg. South America (%)',
      data: SA_DATA,
      borderColor: 'rgba(255,255,255,0.55)',
      borderDash: [6, 6],
      pointRadius: 0,
      tension: 0,
      yAxisID: 'y',
    }
  ]
};

  return (
    <div style={{ width: '100%', height: '100%', padding: '10px' }}>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default AltitudeChart;