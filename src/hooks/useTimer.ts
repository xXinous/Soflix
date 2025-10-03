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
      const totalMilliseconds = now.getTime() - firstDate.getTime();
      
      // Calcular cada unidade de tempo em sequência
      const totalSeconds = Math.floor(totalMilliseconds / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);
      const totalWeeks = Math.floor(totalDays / 7);
      
      // Calcular anos e meses considerando os dias exatos
      let years = now.getFullYear() - firstDate.getFullYear();
      let months = now.getMonth() - firstDate.getMonth();
      
      // Ajustar meses se necessário
      if (months < 0) {
        years--;
        months += 12;
      }
      
      // Ajustar se o dia ainda não chegou no mês atual
      if (now.getDate() < firstDate.getDate() ||
          (now.getDate() === firstDate.getDate() && 
           (now.getHours() < firstDate.getHours() ||
            (now.getHours() === firstDate.getHours() && 
             now.getMinutes() < firstDate.getMinutes())))) {
        months--;
        if (months < 0) {
          years--;
          months += 12;
        }
      }
      
      // Calcular a data do último aniversário mensal
      const lastAnniversary = new Date(
        now.getFullYear(),
        now.getMonth(),
        firstDate.getDate(),
        firstDate.getHours(),
        firstDate.getMinutes(),
        firstDate.getSeconds()
      );
      
      // Se ainda não chegamos no dia/hora do aniversário mensal, voltar um mês
      if (lastAnniversary > now) {
        lastAnniversary.setMonth(lastAnniversary.getMonth() - 1);
      }
      
      // Calcular o tempo desde o último aniversário mensal
      const timeSinceLastAnniversary = now.getTime() - lastAnniversary.getTime();
      
      // Calcular semanas e dias
      const totalDaysRemaining = Math.floor(timeSinceLastAnniversary / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(totalDaysRemaining / 7);
      const days = totalDaysRemaining % 7;
      
      // Calcular horas, minutos e segundos restantes
      const remainingAfterDays = timeSinceLastAnniversary % (1000 * 60 * 60 * 24);
      const hours = Math.floor(remainingAfterDays / (1000 * 60 * 60));
      const minutes = Math.floor((remainingAfterDays % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingAfterDays % (1000 * 60)) / 1000);
      
      setTimeElapsed({ years, months, weeks, days, hours, minutes, seconds });
    };
    
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return timeElapsed;
};
