import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { toast } from 'sonner';
import { MinimalBackground } from '@/components/ui/minimal-doodles';

const Recommendation: React.FC = () => {
  const { data, addLikedPet, reset } = useQuiz();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-10, 10]);
  const opacityLeft = useTransform(x, [-100, -20], [1, 0]);
  const opacityRight = useTransform(x, [20, 100], [0, 1]);

  useEffect(() => {
    if (!data.birthday || data.recommendations.length === 0) {
      navigate('/');
    }
  }, [data.birthday, data.recommendations, navigate]);

  const pets = data.recommendations;
  const currentPet = pets[currentIdx];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      addLikedPet(currentPet.name);
      toast.success(`你心动了: ${currentPet.name}!`);
    } else {
      toast.info(`你划走了: ${currentPet.name}`);
    }

    setSwipeDirection(direction);

    setTimeout(() => {
      setSwipeDirection(null);
      x.set(0);
      if (currentIdx < pets.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  const handleReset = () => {
    reset();
    navigate('/');
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
        <MinimalBackground />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md text-center space-y-8 relative z-10"
        >
          <div className="space-y-4">
            <h2 className="heading-minimal text-3xl tracking-tight">你的萌宠伙伴</h2>
            <p className="text-foreground/60 text-sm">
              {data.likedPets.length === pets.length
                ? "你是萌宠全能爱好者！"
                : data.likedPets.length > 0
                ? "它们都在等待着你的爱护"
                : "要不要重新测试，找找那个命中注定的它？"}
            </p>
          </div>

          {/* 心动列表 - 极简手绘风格 */}
          <div className="flex flex-wrap justify-center gap-4">
            {data.likedPets.length > 0 ? (
              data.likedPets.map((name, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="input-minimal px-6 py-4"
                >
                  <span className="font-medium text-base">{name}</span>
                </motion.div>
              ))
            ) : (
              <p className="text-foreground/40 text-sm">暂时没有心动的萌宠...</p>
            )}
          </div>

          <button
            onClick={handleReset}
            className="btn-minimal w-full py-5 text-base tracking-wide"
          >
            重新测试
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col relative">
      <MinimalBackground />

      {/* 极简顶部 - 大量留白 */}
      <div className="w-full max-w-md mx-auto pt-6 pb-4 text-center relative z-10">
        <p className="label-minimal text-xs">
          {currentIdx + 1} / {pets.length}
        </p>
      </div>

      {/* 卡片区域 - 极简手绘风格 */}
      <div className="flex-1 flex items-center justify-center py-6">
        <div className="relative w-full max-w-md aspect-[3/4.2]">
          <AnimatePresence>
            {currentIdx < pets.length && (
              <motion.div
                key={currentIdx}
                style={{ x, rotate }}
                className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: swipeDirection === 'left' ? -500 : swipeDirection === 'right' ? 500 : x.get(),
                  rotate: swipeDirection === 'left' ? -20 : swipeDirection === 'right' ? 20 : rotate.get()
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 100 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 100) handleSwipe('right');
                  else if (info.offset.x < -100) handleSwipe('left');
                }}
              >
                {/* 极简手绘卡片 */}
                <div className="w-full h-full overflow-hidden bg-card relative" style={{
                  border: '4px solid hsl(var(--foreground))',
                  borderRadius: '8px 6px 7px 5px',
                  background: 'hsl(var(--card))'
                }}>
                  <div className="h-[55%] w-full relative">
                    <img
                      src={currentPet.image}
                      alt={currentPet.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* 极简反馈标记 */}
                    <motion.div
                      style={{ opacity: opacityRight }}
                      className="absolute top-6 left-6 input-minimal bg-white/95 text-foreground px-4 py-2 font-bold text-lg shadow-lg"
                      style={{ rotate: '-8deg' }}
                    >
                      ◆ 喜欢
                    </motion.div>
                    <motion.div
                      style={{ opacity: opacityLeft }}
                      className="absolute top-6 right-6 input-minimal bg-white/95 text-foreground/60 px-4 py-2 font-bold text-lg shadow-lg"
                      style={{ rotate: '8deg' }}
                    >
                      划走 ◆
                    </motion.div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="heading-minimal text-3xl mb-2">{currentPet.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentPet.traits.map((trait: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 bg-white/25 backdrop-blur-sm"
                            style={{ borderRadius: '4px' }}
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="h-[45%] p-6 flex flex-col justify-center text-center">
                    <p className="text-sm leading-relaxed mb-4 text-foreground/80">
                      {currentPet.description}
                    </p>
                    <p className="label-minimal text-xs text-[hsl(var(--gold)_/_0.6)]">
                      星座契合度 ◆◆◆◆◆
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 极简按钮 - 手绘风格 */}
      <div className="w-full max-w-md flex justify-center gap-8 pb-8 relative z-10">
        <button
          onClick={() => handleSwipe('left')}
          className="input-minimal w-24 h-24 flex items-center justify-center bg-card hover:bg-foreground/5 transition-all"
        >
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="input-minimal w-24 h-24 flex items-center justify-center transition-all hover:scale-105"
          style={{
            background: 'hsl(var(--foreground))',
            borderColor: 'hsl(var(--foreground))'
          }}
        >
          <svg className="w-12 h-12 text-background" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Recommendation;
