import { useState, useEffect } from 'react';
import { TimeElapsed } from '@/types';
import { APP_CONFIG } from '@/constants';

export const useTimer = () => {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const firstDate = new Date(APP_CONFIG.FIRST_DATE);
    
    const updateTimer = () => {
      const now = new Date();
      
      // Calcular anos e meses
      let years = now.getFullYear() - firstDate.getFullYear();
      let months = now.getMonth() - firstDate.getMonth();
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      // Calcular o resto em milissegundos
      const yearMonthDate = new Date(
        firstDate.getFullYear() + years, 
        firstDate.getMonth() + months, 
        firstDate.getDate(), 
        firstDate.getHours(), 
        firstDate.getMinutes(), 
        firstDate.getSeconds()
      );
      const remainingTime = now.getTime() - yearMonthDate.getTime();
      
      const weeks = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 7));
      const days = Math.floor((remainingTime % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      
      setTimeElapsed({ years, months, weeks, days, hours, minutes, seconds });
    };
    
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return timeElapsed;
};
