import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';

const Home: React.FC = () => {
  const [dateStr, setDateStr] = useState('');
  const { setBirthday } = useQuiz();
  const navigate = useNavigate();

  const handleStart = () => {
    if (!dateStr) {
      toast.error('请先填写您的生日');
      return;
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      toast.error('请输入有效的日期');
      return;
    }
    setBirthday(date);
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 animate-pulse">✦</div>
      <div className="absolute top-20 right-20 text-4xl opacity-10 animate-pulse delay-100">★</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-pulse delay-200">✧</div>
      <div className="absolute bottom-32 right-32 text-3xl opacity-10 animate-pulse">☆</div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-primary/20 rounded-[2rem] flex items-center justify-center border-4 border-primary/30 shadow-lg">
                <Sparkles className="w-12 h-12 text-primary" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-2 -right-2 text-3xl">✦</div>
            </div>
          </motion.div>
          <h1 className="text-5xl font-black mb-3 gradient-text tracking-wide">星宠缘</h1>
          <p className="text-muted-foreground text-lg">找到命中注定的萌宠伴侣</p>
        </div>

        <Card className="border-4 border-primary/20 shadow-2xl overflow-hidden rounded-[2rem] bg-card/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pb-8">
            <CardTitle className="text-2xl flex items-center gap-3 justify-center font-bold">
              <Calendar className="w-7 h-7 text-primary" strokeWidth={2.5} />
              <span>填写你的生日</span>
            </CardTitle>
            <CardDescription className="text-center text-base mt-2">
              我们将以此计算你的星座属性 ✨
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 pb-8 px-6 space-y-8">
            <div className="space-y-3">
              <Label htmlFor="birthday" className="text-lg font-semibold">出生日期</Label>
              <Input
                id="birthday"
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="text-lg h-14 rounded-2xl border-3 border-primary/30 focus-visible:ring-primary focus-visible:ring-4 focus-visible:border-primary bg-white shadow-sm"
              />
            </div>
            
            <Button 
              onClick={handleStart} 
              className="w-full h-16 text-xl font-black rounded-[1.5rem] transition-all hover:scale-105 active:scale-95 shadow-lg bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 hover:bg-pos-100 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                开始测试
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
          </CardContent>
        </Card>

        <div className="mt-10 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
          <span className="text-lg">✦</span>
          <span>2026 星宠缘</span>
          <span className="text-lg">✦</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
