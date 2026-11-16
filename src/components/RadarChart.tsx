import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface RadarScoreItem {
  pillarVi: string;
  score: number;
}

export const RadarChart: React.FC<{ items: RadarScoreItem[] }> = ({ items }) => {
  const data = {
    labels: items.map((s) => [s.pillarVi, `(${s.score}/5)`]),
    datasets: [
      {
        label: 'Năng lực hiện tại',
        data: items.map((s) => s.score),
        backgroundColor: 'rgba(92, 225, 230, 0.28)',
        borderColor: '#5ce1e6',
        borderWidth: 2.5,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#5ce1e6',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          color: '#ffffff',
          backdropColor: 'transparent',
          font: { size: 10, family: 'Helios' },
        },
        grid: { color: 'rgba(92, 225, 230, 0.25)' },
        angleLines: { color: 'rgba(255, 255, 255, 0.22)' },
        pointLabels: {
          color: '#ffffff',
          font: { size: 11, weight: 'bold' as const, family: 'Helios' },
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="relative h-72 w-full">
      <Radar data={data} options={options} />
    </div>
  );
};
