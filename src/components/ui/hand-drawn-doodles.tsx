import React from 'react';

/* Logo Icon 组件 - 需要替换为实际图片 */
export const AppLogo: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 80
}) => {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <img
        src="/icons/logo-main.png"
        alt="星宠缘 Logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          // 图片加载失败时显示占位符
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const placeholder = target.nextElementSibling as HTMLElement;
          if (placeholder) placeholder.style.display = 'flex';
        }}
      />
      {/* 占位符 - 当图片未加载时显示 */}
      <div
        className="w-full h-full items-center justify-center text-4xl"
        style={{ display: 'none' }}
      >
        🐾
      </div>
    </div>
  );
};

/* 手绘星星涂鸦 */
export const DoodleStar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M50 10 L60 40 L90 45 L65 65 L70 95 L50 80 L30 95 L35 65 L10 45 L40 40 Z" />
  </svg>
);

/* 手绘波浪线 */
export const DoodleWave: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 20"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M0 10 Q25 0, 50 10 T100 10 T150 10 T200 10" />
  </svg>
);

/* 手绘圆圈 */
export const DoodleCircle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  >
    <ellipse cx="50" cy="50" rx="40" ry="38" />
  </svg>
);

/* 手绘箭头 */
export const DoodleArrow: React.FC<{
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right'
}> = ({ className = '', direction = 'right' }) => {
  const rotations = {
    up: 0,
    right: 90,
    down: 180,
    left: 270
  };

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
    >
      <path d="M50 20 L50 70 M30 50 L50 20 L70 50" />
    </svg>
  );
};

/* 手绘心形涂鸦 */
export const DoodleHeart: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
  >
    <path d="M50 85 C20 60, 10 40, 25 25 C35 15, 45 20, 50 30 C55 20, 65 15, 75 25 C90 40, 80 60, 50 85 Z" />
  </svg>
);

/* 手绘爪印涂鸦 */
export const DoodlePaw: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
  >
    <ellipse cx="50" cy="60" rx="22" ry="20" />
    <ellipse cx="30" cy="35" rx="10" ry="12" />
    <ellipse cx="50" cy="28" rx="10" ry="12" />
    <ellipse cx="70" cy="35" rx="10" ry="12" />
  </svg>
);

/* 手绘云朵 */
export const DoodleCloud: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 80"
    fill="currentColor"
    className={className}
    opacity="0.3"
  >
    <path d="M20 60 Q10 60, 10 50 Q10 30, 30 30 Q35 15, 55 15 Q75 15, 85 30 Q100 25, 105 40 Q115 45, 110 60 Z" />
  </svg>
);

/* 手绘涂鸦组合 - 背景装饰 */
export const DoodleBackground: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    {/* 左上角 */}
    <div className="absolute top-8 left-8 opacity-10">
      <DoodleStar className="w-16 h-16 text-primary" />
    </div>
    {/* 右上角 */}
    <div className="absolute top-12 right-12 opacity-10">
      <DoodleCircle className="w-20 h-20 text-primary" />
    </div>
    {/* 左下角 */}
    <div className="absolute bottom-16 left-12 opacity-10">
      <DoodlePaw className="w-14 h-14 text-primary" />
    </div>
    {/* 右下角 */}
    <div className="absolute bottom-12 right-8 opacity-10">
      <DoodleHeart className="w-12 h-12 text-primary" />
    </div>
    {/* 中间点缀 */}
    <div className="absolute top-1/3 right-1/4 opacity-8">
      <DoodleStar className="w-10 h-10 text-secondary" />
    </div>
    <div className="absolute bottom-1/3 left-1/4 opacity-8">
      <DoodleCircle className="w-8 h-8 text-accent" />
    </div>
  </div>
);
