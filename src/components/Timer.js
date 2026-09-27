import React, { useEffect, useRef, useState } from 'react';

const secsPerQuestion = 30;

export default function Timer({ dispatch, numOfQuestions }) {
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(
    () => numOfQuestions * secsPerQuestion,
  );

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${mins} : ${secs}`;
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          dispatch({ type: 'finishQuiz' });

          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [dispatch]);

  return (
    <div className={`timer ${timeLeft <= 30 ? 'timerAnimation' : ''}`}>
      {formatTime(timeLeft)}
    </div>
  );
}
