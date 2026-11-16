import React from 'react';
import { PillarKey } from '../data/assessmentData';

export const PillarSymbol: React.FC<{ pillar: PillarKey; className?: string }> = ({
  pillar,
  className = 'w-4 h-4',
}) => {
  switch (pillar) {
    case 'customer_thinking':
      // Concentric focus symbol (Thấu hiểu khách hàng / Target Focus)
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.25" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'execution':
      // Forward momentum geometric delta / arrow symbol (Thực thi Marketing / Action & Drive)
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L20.5 19.5L12 15.5L3.5 19.5L12 2Z" fill="currentColor" fillOpacity="0.2" strokeLinejoin="round" />
        </svg>
      );
    case 'data_literacy':
      // 4-Quadrant Matrix Symbol (Phân tích dữ liệu / Data & Metrics)
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.15" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.35" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.25" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.75" />
        </svg>
      );
    case 'ai_literacy':
      // 4-Point Starburst Sparkle Symbol (Ứng dụng AI / Intelligence & Spark)
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1C12 7.075 7.075 12 1 12C7.075 12 12 16.925 12 23C12 16.925 16.925 12 23 12C16.925 12 12 7.075 12 1Z" />
        </svg>
      );
    case 'learning_agility':
      // Infinite Learning Loop Symbol (Phối hợp & Học hỏi / Continuous Growth)
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.178 8c5.096 0 5.096 8 0 8-3.082 0-4.887-3.13-6.178-5.334C10.709 8.463 8.904 8 5.822 8c-5.096 0-5.096 8 0 8 3.082 0 4.887-3.13 6.178-5.334C13.291 12.87 15.096 16 18.178 16"
          />
        </svg>
      );
  }
};

export const CheckSymbol: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SoundSymbol: React.FC<{ enabled: boolean; className?: string }> = ({
  enabled,
  className = 'w-4 h-4',
}) =>
  enabled ? (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
    </svg>
  ) : (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
    </svg>
  );
