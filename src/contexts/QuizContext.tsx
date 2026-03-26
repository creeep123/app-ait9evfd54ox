import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getZodiacSign } from '@/lib/pet-logic';

interface QuizData {
  birthday: Date | null;
  zodiac: string;
  answers: string[];
  recommendations: any[];
  likedPets: string[];
}

interface QuizContextType {
  data: QuizData;
  setBirthday: (date: Date) => void;
  setAnswers: (answers: string[]) => void;
  setRecommendations: (pets: any[]) => void;
  addLikedPet: (petName: string) => void;
  reset: () => void;
}

const defaultData: QuizData = {
  birthday: null,
  zodiac: '',
  answers: [],
  recommendations: [],
  likedPets: [],
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<QuizData>(defaultData);

  const setBirthday = (date: Date) => {
    setData(prev => ({
      ...prev,
      birthday: date,
      zodiac: getZodiacSign(date)
    }));
  };

  const setAnswers = (answers: string[]) => {
    setData(prev => ({ ...prev, answers }));
  };

  const setRecommendations = (pets: any[]) => {
    setData(prev => ({ ...prev, recommendations: pets }));
  };

  const addLikedPet = (petName: string) => {
    setData(prev => ({ ...prev, likedPets: [...prev.likedPets, petName] }));
  };

  const reset = () => {
    setData(defaultData);
  };

  return (
    <QuizContext.Provider value={{ data, setBirthday, setAnswers, setRecommendations, addLikedPet, reset }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
