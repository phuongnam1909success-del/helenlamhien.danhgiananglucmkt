import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarScoreItem {
  pillarVi: string;
  pillarEn: string;
  score: number;
}

export const RadarChart: React.FC<{ items: RadarScoreItem[] }> = ({ items }) => {
  const data = {
    labels: items.map((s) => [s.pillarVi, `${s.pillarEn} (${s.score}/5)`]),
    datasets: [
      {
        label: 'Trải nghiệm tự chọn',
        data: items.map((s) => s.score),
        backgroundColor: 'rgba(92, 225, 230, 0.35)',
        borderColor: '#5ce1e6',
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#5ce1e6',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Mốc kỳ vọng · minh họa (4/5)',
        data: [4, 4, 4, 4, 4],
        backgroundColor: 'transparent',
        borderColor: '#10b981',
        borderWidth: 2,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 1.5,
        pointRadius: 3,
      },
      {
        label: 'Mốc tối thiểu · minh họa (3/5)',
        data: [3, 3, 3, 3, 3],
        backgroundColor: 'transparent',
        borderColor: '#f59e0b',
        borderWidth: 2,
        borderDash: [5, 4],
        pointBackgroundColor: '#f59e0b',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 1.5,
        pointRadius: 3,
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
          color: '#e4f1ee',
          backdropColor: 'transparent',
          font: { size: 10, family: 'Roboto' },
        },
        grid: { color: 'rgba(92, 225, 230, 0.22)' },
        angleLines: { color: 'rgba(255, 255, 255, 0.22)' },
        pointLabels: {
          color: '#ffffff',
          font: { size: 11, weight: 'bold' as const, family: 'Roboto' },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: { family: 'Roboto', weight: 'bold' as const },
        bodyFont: { family: 'Roboto' },
      },
    },
  };

  return (
    <div className="space-y-3">
      <div className="relative h-72 sm:h-80 w-full">
        <Radar data={data} options={options} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] text-white/90 pt-1">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#5ce1e6] shadow-[0_0_8px_#5ce1e6]" />
          <span>Trải nghiệm tự chọn</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-1 rounded-sm bg-[#10b981]" />
          <span>Mốc kỳ vọng (4/5)</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-1 border-t-2 border-dashed border-[#f59e0b]" />
          <span>Mốc tối thiểu (3/5)</span>
        </span>
      </div>
      <p className="text-[11px] text-white/70 bg-black/40 rounded-xl p-2.5 leading-relaxed border border-white/10 text-center">
        <strong>Lưu ý tham chiếu:</strong> Mốc 3/5 và 4/5 chỉ là mốc tham chiếu minh họa của The Talent Framework để định hướng thực hành, không phải chuẩn đánh giá năng lực hay chuẩn tuyển dụng chính thức.
      </p>
    </div>
  );
};
