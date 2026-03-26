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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 space-y-8 relative overflow-hidden">
        {/* 装饰性背景 */}
        <div className="absolute top-10 left-10 text-5xl opacity-10 animate-pulse">✦</div>
        <div className="absolute top-20 right-10 text-4xl opacity-10 animate-pulse delay-100">★</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-10 animate-pulse delay-200">✧</div>
        <div className="absolute bottom-10 right-20 text-5xl opacity-10 animate-pulse">☆</div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md text-center relative z-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="inline-block mb-8"
          >
            <div className="p-6 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-[2rem] border-4 border-primary/40 shadow-2xl">
              <Trophy className="w-16 h-16 text-primary" strokeWidth={2.5} />
            </div>
          </motion.div>
          <h2 className="text-4xl font-black gradient-text mb-6">测试报告汇总</h2>
          
          <Card className="border-4 border-primary/20 shadow-2xl p-8 mb-10 bg-card/80 backdrop-blur-sm rounded-[2rem]">
            <div className="space-y-8">
              {data.likedPets.length > 0 ? (
                <>
                  <p className="text-xl font-bold">你最有缘分的萌宠是：</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {data.likedPets.map((name, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="text-xl py-3 px-6 rounded-[1.5rem] bg-gradient-to-r from-secondary/80 to-accent/80 text-foreground font-black shadow-lg border-3 border-secondary/50"
                      >
                        ✦ {name}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground mt-6 italic text-lg">
                    {data.likedPets.length === pets.length 
                      ? "你是萌宠全能爱好者！✨" 
                      : "它们都在等待着你的爱护呢！💕"}
                  </p>
                </>
              ) : (
                <div className="space-y-6">
                  <p className="text-2xl text-muted-foreground font-bold">暂时没有心动的萌宠...</p>
                  <p className="text-base">要不要重新测试，找找那个命中注定的它？✨</p>
                </div>
              )}
            </div>
          </Card>

          <Button 
            onClick={handleReset} 
            className="w-full h-16 text-xl font-black rounded-[1.5rem] group shadow-lg bg-gradient-to-r from-primary via-secondary to-primary"
          >
            <RefreshCw className="mr-3 w-7 h-7 group-hover:rotate-180 transition-transform duration-500" strokeWidth={2.5} />
            重新测试
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-between py-10 overflow-hidden relative">
      {/* 装饰性背景 */}
      <div className="absolute top-5 left-5 text-3xl opacity-10 animate-pulse">✦</div>
      <div className="absolute top-20 right-10 text-4xl opacity-10 animate-pulse delay-100">★</div>
      
      <div className="w-full max-w-md text-center space-y-3 relative z-10">
        <h2 className="text-3xl font-black gradient-text flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" strokeWidth={2.5} />
          为你推荐的萌宠
        </h2>
        <p className="text-muted-foreground text-lg font-semibold">
          第 <span className="text-primary text-xl">{currentIdx + 1}</span> / {pets.length} 只
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
              <Card className="w-full h-full border-4 border-primary/30 shadow-2xl overflow-hidden rounded-[2.5rem] bg-card relative">
                <div className="h-[65%] w-full relative">
                  <img 
                    src={currentPet.image} 
                    alt={currentPet.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
                  {/* 反馈标记 */}
                  <motion.div 
                    style={{ opacity: opacityRight }}
                    className="absolute top-12 left-12 border-[5px] border-primary text-primary px-6 py-2 rounded-[1.5rem] font-black text-4xl rotate-[-20deg] uppercase bg-white/90 shadow-xl"
                  >
                    心动 ✦
                  </motion.div>
                  <motion.div 
                    style={{ opacity: opacityLeft }}
                    className="absolute top-12 right-12 border-[5px] border-destructive text-destructive px-6 py-2 rounded-[1.5rem] font-black text-4xl rotate-[20deg] uppercase bg-white/90 shadow-xl"
                  >
                    划走 ✕
                  </motion.div>

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-4xl font-black mb-3 drop-shadow-lg">{currentPet.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentPet.traits.map((trait: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="bg-white/30 text-white backdrop-blur-md border-2 border-white/50 font-bold text-sm py-1 px-3 rounded-xl">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <CardContent className="h-[35%] p-8 flex flex-col justify-center text-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
                  <p className="text-xl font-semibold leading-relaxed italic mb-4">
                    "{currentPet.description}"
                  </p>
                  <div className="flex justify-center">
                    <Badge variant="outline" className="border-2 border-primary/50 text-primary bg-primary/10 px-5 py-2 rounded-[1.5rem] text-base font-bold">
                       星座契合度 ★★★★☆
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md flex justify-around items-center px-4 relative z-10">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => handleSwipe('left')}
          className="w-20 h-20 rounded-full border-4 border-muted text-muted-foreground hover:bg-destructive hover:text-white hover:border-destructive transition-all hover:scale-110 active:scale-90 shadow-lg"
        >
          <X className="w-10 h-10" strokeWidth={3} />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => handleSwipe('right')}
          className="w-24 h-24 rounded-full border-4 border-primary text-primary hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-90 shadow-2xl shadow-primary/30 bg-white"
        >
          <Heart className="w-12 h-12 fill-current" strokeWidth={0} />
        </Button>
      </div>
    </div>
  );
};

export default Recommendation;
