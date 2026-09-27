import React from 'react';

export default function Options({
  options,
  dispatch,
  answer,
  correctAnswer,
  points,
}) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? 'answer' : ''}
          ${hasAnswered ? (index === correctAnswer ? 'correct' : 'wrong') : ''}`}
          key={option}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
