'use client'
import { useEffect, useState } from "react";

export function useTimer(endTime: Date | null) {

  const calcSecondsLeft = (_endTime: Date) =>
    Math.max(0, Math.floor((_endTime.getTime() - Date.now()) / 1000));

  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    if(!endTime)
    {
        setSecondsLeft(null);
        return;
    }
        
    setSecondsLeft(calcSecondsLeft(endTime));

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev === null) return null;
        const newVal = prev - 1;
        return newVal >= 0 ? newVal : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return {secondsLeft};

}