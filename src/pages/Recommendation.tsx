import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, RefreshCw, Trophy, Sparkles } from 'lucide-react';
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

  // 检查是否已经完成了问答，如果没有则跳转回首页
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
      toast.success(`你心动了: ${currentPet.name}!`, { icon: '❤️' });
    } else {
      toast.info(`你划走了: ${currentPet.name}`, { icon: '👋' });
    }

    setSwipeDirection(direction);
    
    setTimeout(() => {
      setSwipeDirection(null);
      x.set(0); // 重置 x 值
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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="inline-block p-4 bg-primary/20 rounded-full mb-6">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">测试报告汇总</h2>
          
          <Card className="border-2 border-primary/20 shadow-xl p-8 mb-8 bg-card/50 backdrop-blur-sm">
            <div className="space-y-6">
              {data.likedPets.length > 0 ? (
                <>
                  <p className="text-lg">你最有缘分的萌宠是：</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {data.likedPets.map((name, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xl py-2 px-4 rounded-full bg-secondary text-secondary-foreground font-bold shadow-sm">
                        {name}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground mt-4 italic">
                    {data.likedPets.length === pets.length 
                      ? "你是萌宠全能爱好者！" 
                      : "它们都在等待着你的爱护呢！"}
                  </p>
                </>
              ) : (
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground">暂时没有心动的萌宠...</p>
                  <p className="text-sm">要不要重新测试，找找那个命中注定的它？</p>
                </div>
              )}
            </div>
          </Card>

          <Button 
            onClick={handleReset} 
            className="w-full h-14 text-xl font-bold rounded-full group"
          >
            <RefreshCw className="mr-2 w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
            重新测试
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-between py-10 overflow-hidden">
      <div className="w-full max-w-md text-center space-y-2">
        <h2 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6" />
          为你推荐的萌宠
        </h2>
        <p className="text-muted-foreground">
          第 {currentIdx + 1} / {pets.length} 只
        </p>
      </div>

      <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center perspective-1000">
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
              <Card className="w-full h-full border-none shadow-2xl overflow-hidden rounded-[2rem] bg-card relative">
                <div className="h-[65%] w-full relative">
                  <img 
                    src={currentPet.image} 
                    alt={currentPet.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* 反馈标记 */}
                  <motion.div 
                    style={{ opacity: opacityRight }}
                    className="absolute top-10 left-10 border-4 border-primary text-primary px-4 py-1 rounded-xl font-bold text-3xl rotate-[-20deg] uppercase"
                  >
                    心动
                  </motion.div>
                  <motion.div 
                    style={{ opacity: opacityLeft }}
                    className="absolute top-10 right-10 border-4 border-destructive text-destructive px-4 py-1 rounded-xl font-bold text-3xl rotate-[20deg] uppercase"
                  >
                    划走
                  </motion.div>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-3xl font-bold">{currentPet.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentPet.traits.map((trait: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="bg-white/20 text-white backdrop-blur-md border-none">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <CardContent className="h-[35%] p-8 flex flex-col justify-center text-center">
                  <p className="text-lg font-medium leading-relaxed italic">
                    "{currentPet.description}"
                  </p>
                  <div className="mt-4 flex justify-center">
                    <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5 px-4 py-1 rounded-full text-xs">
                       星座契合度 ★★★★☆
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md flex justify-around items-center px-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full border-2 border-muted text-muted-foreground hover:bg-destructive hover:text-white hover:border-destructive transition-all hover:scale-110 active:scale-90"
        >
          <X className="w-8 h-8" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => handleSwipe('right')}
          className="w-20 h-20 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-90 shadow-lg shadow-primary/20"
        >
          <Heart className="w-10 h-10 fill-current" />
        </Button>
      </div>
    </div>
  );
};

export default Recommendation;
