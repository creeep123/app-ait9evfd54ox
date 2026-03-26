import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { MinimalBackground, GoldDivider } from '@/components/ui/minimal-doodles';

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-4 relative">
      {/* 极简抽象背景装饰 */}
      <MinimalBackground />

      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        {/* Logo & 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center space-y-3 mb-6"
        >
          <div className="relative">
            <img
              src="/images/logo.png"
              alt="星宠缘 Logo"
              className="w-44 h-44 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = 'flex';
              }}
            />
            {/* 占位符 */}
            <div className="w-44 h-44 items-center justify-center text-5xl" style={{ display: 'none' }}>
              🐾
            </div>
          </div>
          <div className="text-center space-y-1">
            <h1 className="heading-minimal text-2xl tracking-tight">
              星宠缘
            </h1>
            <p className="label-minimal text-xs">发现属于你的灵魂伴侣</p>
          </div>
        </motion.div>

        {/* 金色分隔线 */}
        <GoldDivider className="w-full max-w-xs mb-6" />

        {/* 表单区域 - 极简风格 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="w-full space-y-6"
        >
          <div className="space-y-2">
            <label htmlFor="birthday" className="label-minimal block text-center">
              生日
            </label>
            <div className="input-minimal p-4">
              <input
                id="birthday"
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-base text-center focus:outline-none focus:ring-0 text-foreground"
                style={{ fontSize: '1rem', letterSpacing: '0.02em' }}
              />
            </div>
          </div>

          <button
            onClick={handleStart}
            className="relative w-full"
            style={{
              backgroundImage: 'url(/images/button.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              border: 'none',
              backgroundColor: 'transparent',
              height: '72px',
              cursor: 'pointer'
            }}
          >
          </button>
        </motion.div>

        {/* 底部极简装饰 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6"
        >
          <div className="gold-dots flex items-center justify-center text-[hsl(var(--gold)_/_0.5)] text-xs">
            <span className="label-minimal">基于星座与性格的智能匹配</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
