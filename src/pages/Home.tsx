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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-block p-3 bg-primary/20 rounded-full mb-4"
          >
            <Sparkles className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold text-primary mb-2">萌宠缘分测试</h1>
          <p className="text-muted-foreground">测测你的专属萌宠</p>
        </div>

        <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              填写你的生日
            </CardTitle>
            <CardDescription>我们将以此计算你的星座属性</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="birthday">出生日期</Label>
              <Input
                id="birthday"
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="text-lg h-12 focus-visible:ring-primary"
              />
            </div>
            
            <Button 
              onClick={handleStart} 
              className="w-full h-12 text-lg font-bold rounded-full transition-all hover:scale-105"
            >
              开始测试
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          2026 萌宠缘分测试
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
