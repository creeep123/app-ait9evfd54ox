import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowRight, BrainCircuit } from 'lucide-react';
import { questions, calculateMatch } from '@/lib/pet-logic';

const Quiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const { data, setAnswers, setRecommendations } = useQuiz();
  const navigate = useNavigate();

  const progress = ((currentIdx + 1) / questions.length) * 100;
  const currentQuestion = questions[currentIdx];

  const handleNext = () => {
    if (!userAnswers[currentIdx]) {
      toast.error('请选择一个选项后继续');
      return;
    }

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // 结束测试
      setAnswers(userAnswers);
      const recommendations = calculateMatch(data.zodiac, userAnswers);
      setRecommendations(recommendations);
      navigate('/recommendation');
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSelect = (value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIdx] = value;
    setUserAnswers(newAnswers);
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col pt-10 relative overflow-hidden">
      {/* 装饰性背景 */}
      <div className="absolute top-5 right-10 text-4xl opacity-10 animate-pulse">✦</div>
      <div className="absolute bottom-10 left-10 text-3xl opacity-10 animate-pulse delay-100">★</div>
      
      <div className="w-full max-w-md mx-auto space-y-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrev} 
            disabled={currentIdx === 0}
            className="rounded-full w-12 h-12 hover:bg-primary/10 disabled:opacity-30"
          >
            <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
          </Button>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-black gradient-text">性格测试</h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-primary font-bold">第 {currentIdx + 1} 题</span>
              <span>/</span>
              <span>共 {questions.length} 题</span>
            </p>
          </div>
          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full border-3 border-secondary/50">
            <BrainCircuit className="w-6 h-6 text-secondary" strokeWidth={2.5} />
          </div>
        </div>

        <Progress value={progress} className="h-3 rounded-full shadow-inner" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-4 border-primary/20 shadow-2xl bg-card/80 backdrop-blur-sm overflow-hidden rounded-[2rem]">
              <CardHeader className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pb-10">
                <CardTitle className="text-2xl font-bold leading-relaxed text-center">
                  {currentQuestion.text}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-10 px-6 pb-8">
                <RadioGroup 
                  value={userAnswers[currentIdx] || ''} 
                  onValueChange={handleSelect}
                  className="space-y-5"
                >
                  {currentQuestion.options.map((option) => (
                    <div 
                      key={option.value}
                      className={`flex items-center space-x-4 p-5 rounded-[1.5rem] border-3 transition-all cursor-pointer relative overflow-hidden ${
                        userAnswers[currentIdx] === option.value 
                          ? 'border-primary bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/10 shadow-lg scale-[1.02]' 
                          : 'border-border bg-white hover:border-primary/50 hover:shadow-md'
                      }`}
                      onClick={() => handleSelect(option.value)}
                    >
                      <RadioGroupItem value={option.value} id={`q${currentIdx}-opt-${option.value}`} className="sr-only" />
                      <div className={`w-6 h-6 rounded-full border-3 flex items-center justify-center transition-all ${
                        userAnswers[currentIdx] === option.value 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground/30'
                      }`}>
                        {userAnswers[currentIdx] === option.value && (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </div>
                      <Label 
                        htmlFor={`q${currentIdx}-opt-${option.value}`}
                        className="text-lg font-medium flex-1 cursor-pointer"
                      >
                        {option.label}
                      </Label>
                      {userAnswers[currentIdx] === option.value && (
                        <span className="text-2xl">✦</span>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <Button 
          onClick={handleNext} 
          className="w-full h-16 text-xl font-black rounded-[1.5rem] transition-all group shadow-lg bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-xl"
        >
          {currentIdx === questions.length - 1 ? '查看我的萌宠' : '下一题'}
          <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
