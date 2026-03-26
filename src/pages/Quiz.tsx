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
    <div className="min-h-screen bg-background p-4 flex flex-col pt-10">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrev} 
            disabled={currentIdx === 0}
            className="rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-primary">性格测试</h2>
            <p className="text-xs text-muted-foreground">第 {currentIdx + 1} 题 / 共 {questions.length} 题</p>
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-secondary/50 rounded-full">
            <BrainCircuit className="w-5 h-5 text-primary" />
          </div>
        </div>

        <Progress value={progress} className="h-2 rounded-full" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-primary/5 pb-8">
                <CardTitle className="text-xl font-bold leading-relaxed">
                  {currentQuestion.text}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 px-6">
                <RadioGroup 
                  value={userAnswers[currentIdx] || ''} 
                  onValueChange={handleSelect}
                  className="space-y-4"
                >
                  {currentQuestion.options.map((option) => (
                    <div 
                      key={option.value}
                      className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        userAnswers[currentIdx] === option.value 
                          ? 'border-primary bg-primary/10 shadow-md scale-102' 
                          : 'border-border bg-white hover:border-primary/50'
                      }`}
                      onClick={() => handleSelect(option.value)}
                    >
                      <RadioGroupItem value={option.value} id={`q${currentIdx}-opt-${option.value}`} className="sr-only" />
                      <Label 
                        htmlFor={`q${currentIdx}-opt-${option.value}`}
                        className="text-lg font-medium flex-1 cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <Button 
          onClick={handleNext} 
          className="w-full h-14 text-xl font-bold rounded-full transition-all group"
        >
          {currentIdx === questions.length - 1 ? '查看我的萌宠' : '下一题'}
          <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
