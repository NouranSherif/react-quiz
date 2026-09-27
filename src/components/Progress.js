import React, { useEffect, useRef } from 'react';

export default function Progress({
  points,
  totalPoints,
  index,
  numOfQuestions,
  answer,
}) {
  const progressRef = useRef(null);

  useEffect(() => {
    if (!answer) return;

    progressRef.current.value = index + 1;
  }, [index, answer]);
  return (
    <header className="progress">
      <progress ref={progressRef} max={numOfQuestions}></progress>

      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}
