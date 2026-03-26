import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-background p-6 flex flex-col">
      {/* 极简顶部导航 - 大量留白 */}
      <div className="w-full max-w-md mx-auto space-y-8 pt-8">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="p-2 rounded-lg border-2 border-border hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-foreground/60">
              第 {currentIdx + 1} 题 / 共 {questions.length} 题
            </p>
          </div>

          <div className="w-9" />
        </div>

        {/* 极简进度条 */}
        <div className="progress-hand-drawn">
          <div
            className="progress-hand-drawn-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 问题区域 - 手绘风格 */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* 问题文本 - 极简呈现 */}
              <h2 className="text-2xl font-semibold text-center leading-relaxed">
                {currentQuestion.text}
              </h2>

              {/* 选项 - 手绘风格 */}
              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`option-hand-drawn p-5 ${
                      userAnswers[currentIdx] === option.value ? 'selected' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        userAnswers[currentIdx] === option.value
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/40'
                      }`}>
                        {userAnswers[currentIdx] === option.value && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-base font-medium flex-1">
                        {option.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 底部按钮 - 手绘风格 */}
      <div className="w-full max-w-md mx-auto pb-8">
        <Button
          onClick={handleNext}
          className="btn-hand-drawn w-full h-14 text-base"
        >
          {currentIdx === questions.length - 1 ? '查看我的萌宠' : '下一题'}
          <ArrowRight className="ml-2 w-5 h-5" strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
