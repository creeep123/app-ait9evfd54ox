import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md text-center space-y-10"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">你的萌宠伙伴</h2>
            <p className="text-foreground/60">
              {data.likedPets.length === pets.length
                ? "你是萌宠全能爱好者！"
                : data.likedPets.length > 0
                ? "它们都在等待着你的爱护"
                : "要不要重新测试，找找那个命中注定的它？"}
            </p>
          </div>

          {/* 心动列表 - 手绘风格 */}
          <div className="flex flex-wrap justify-center gap-3">
            {data.likedPets.length > 0 ? (
              data.likedPets.map((name, idx) => (
                <div
                  key={idx}
                  className="hand-drawn px-5 py-3 bg-card"
                >
                  <span className="font-medium">{name}</span>
                </div>
              ))
            ) : (
              <p className="text-foreground/40">暂时没有心动的萌宠...</p>
            )}
          </div>

          <Button
            onClick={handleReset}
            className="btn-hand-drawn w-full h-14 text-base"
          >
            <RefreshCw className="mr-2 w-5 h-5" strokeWidth={2} />
            重新测试
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      {/* 极简顶部 - 大量留白 */}
      <div className="w-full max-w-md mx-auto pt-8 pb-6 text-center">
        <p className="text-sm font-medium text-foreground/60">
          {currentIdx + 1} / {pets.length}
        </p>
      </div>

      {/* 卡片区域 - 手绘边框风格 */}
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="relative w-full max-w-md aspect-[3/4]">
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
                {/* 手绘卡片风格 */}
                <div className="hand-drawn w-full h-full overflow-hidden bg-card">
                  <div className="h-[60%] w-full relative">
                    <img
                      src={currentPet.image}
                      alt={currentPet.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* 手绘风格反馈标记 */}
                    <motion.div
                      style={{ opacity: opacityRight }}
                      className="absolute top-8 left-8 border-3 border-primary bg-white/90 text-primary px-4 py-2 rounded-lg font-bold text-xl rotate-[-12deg] shadow-lg"
                    >
                      喜欢
                    </motion.div>
                    <motion.div
                      style={{ opacity: opacityLeft }}
                      className="absolute top-8 right-8 border-3 border-foreground/60 bg-white/90 text-foreground/60 px-4 py-2 rounded-lg font-bold text-xl rotate-[12deg] shadow-lg"
                    >
                      划走
                    </motion.div>

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-3xl font-bold mb-2">{currentPet.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentPet.traits.map((trait: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-md"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="h-[40%] p-6 flex flex-col justify-center text-center">
                    <p className="text-base leading-relaxed mb-4">
                      {currentPet.description}
                    </p>
                    <p className="text-sm text-foreground/50">
                      星座契合度 ★★★★☆
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 极简按钮 - 手绘风格 */}
      <div className="w-full max-w-md flex justify-center gap-6 pb-8">
        <button
          onClick={() => handleSwipe('left')}
          className="hand-drawn w-16 h-16 flex items-center justify-center bg-card hover:bg-foreground/5 transition-colors"
        >
          <X className="w-8 h-8" strokeWidth={2.5} />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="hand-drawn w-20 h-20 flex items-center justify-center bg-primary hover:bg-primary/90 transition-colors"
          style={{ background: 'hsl(var(--primary))' }}
        >
          <Heart className="w-10 h-10 fill-white text-white" strokeWidth={0} />
        </button>
      </div>
    </div>
  );
};

export default Recommendation;
