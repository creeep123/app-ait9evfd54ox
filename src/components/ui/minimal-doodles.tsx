import React from 'react';

/* 极简抽象线条 - 抽象手绘涂鸦 */
export const AbstractLine: React.FC<{ className?: string; rotate?: number }> = ({
  className = '',
  rotate = 0
}) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path
      d="M10 50 Q30 30, 50 50 T90 50"
      className="abstract-doodle"
      strokeWidth="2"
    />
  </svg>
);

/* 金色螺旋线 */
export const GoldSpiral: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
  >
    <path
      d="M50 50 m-5 0 a5 5 0 1 0 10 0 a10 10 0 1 1 -20 0 a15 15 0 1 0 30 0 a20 20 0 1 1 -40 0"
      className="gold-doodle"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

/* 极简圆圈 - 抽象几何 */
export const MinimalCircle: React.FC<{ className?: string; filled?: boolean }> = ({
  className = '',
  filled = false
}) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      className={filled ? "gold-doodle" : "abstract-doodle"}
      style={filled ? { fill: 'hsl(var(--gold) / 0.15)', stroke: 'hsl(var(--gold))' } : {}}
    />
  </svg>
);

/* 金色交叉线 */
export const GoldCross: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 60 60"
    className={className}
  >
    <line x1="10" y1="10" x2="50" y2="50" className="gold-doodle" />
    <line x1="50" y1="10" x2="10" y2="50" className="gold-doodle" />
  </svg>
);

/* 极简波浪 */
export const MinimalWave: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 30"
    className={className}
  >
    <path
      d="M0 15 Q25 5, 50 15 T100 15 T150 15 T200 15"
      className="abstract-doodle"
      strokeWidth="1.5"
    />
  </svg>
);

/* 抽象点状 */
export const AbstractDots: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
  >
    <circle cx="20" cy="30" r="3" className="abstract-doodle" fill="hsl(var(--foreground))" />
    <circle cx="50" cy="20" r="2" className="abstract-doodle" fill="hsl(var(--foreground))" />
    <circle cx="80" cy="35" r="3" className="abstract-doodle" fill="hsl(var(--foreground))" />
    <circle cx="30" cy="60" r="2" className="abstract-doodle" fill="hsl(var(--foreground))" />
    <circle cx="70" cy="55" r="2.5" className="abstract-doodle" fill="hsl(var(--foreground))" />
  </svg>
);

/* 极简背景装饰 - 大量留白 */
export const MinimalBackground: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    {/* 顶部金色螺旋 */}
    <div className="absolute top-16 right-20 opacity-20">
      <GoldSpiral className="w-24 h-24" />
    </div>

    {/* 左下抽象线条 */}
    <div className="absolute bottom-20 left-16 opacity-10">
      <AbstractLine className="w-20 h-20" rotate={45} />
    </div>

    {/* 右上极简圆圈 */}
    <div className="absolute top-24 right-32 opacity-8">
      <MinimalCircle className="w-16 h-16" />
    </div>

    {/* 左下金色交叉 */}
    <div className="absolute bottom-32 left-24 opacity-15">
      <GoldCross className="w-12 h-12" />
    </div>

    {/* 顶部极简波浪 */}
    <div className="absolute top-1/4 left-1/3 opacity-8">
      <MinimalWave className="w-32 h-8" />
    </div>

    {/* 底部抽象点 */}
    <div className="absolute bottom-1/4 right-1/4 opacity-10">
      <AbstractDots className="w-20 h-20" />
    </div>
  </div>
);

/* 金色分隔线 */
export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)_/_0.3)] to-transparent" />
    <span className="text-[hsl(var(--gold))] text-sm">◆</span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)_/_0.3)] to-transparent" />
  </div>
);

/* 极简 Logo 图标 */
export const MinimalLogo: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 100
}) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={{ width: size, height: size }}
  >
    {/* 抽象爪印 - 极简线条 */}
    <circle
      cx="50"
      cy="55"
      r="18"
      className="abstract-doodle"
      style={{ opacity: 0.15, strokeWidth: 3 }}
    />
    <circle
      cx="35"
      cy="35"
      r="6"
      className="abstract-doodle"
      style={{ opacity: 0.15, strokeWidth: 2 }}
    />
    <circle
      cx="50"
      cy="28"
      r="6"
      className="abstract-doodle"
      style={{ opacity: 0.15, strokeWidth: 2 }}
    />
    <circle
      cx="65"
      cy="35"
      r="6"
      className="abstract-doodle"
      style={{ opacity: 0.15, strokeWidth: 2 }}
    />

    {/* 金色点缀 */}
    <circle
      cx="50"
      cy="55"
      r="3"
      fill="hsl(var(--gold))"
      opacity="0.3"
    />
  </svg>
);
