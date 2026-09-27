import React from 'react';
import Options from './Options';

export default function Question({
  question,
  dispatch,
  answer,
  index,
  numOfQuestions,
}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        options={question.options}
        dispatch={dispatch}
        answer={answer}
        correctAnswer={question.correctOption}
        points={question.points}
      />
    </div>
  );
}
