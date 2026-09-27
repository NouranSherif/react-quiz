import { type } from '@testing-library/user-event/dist/type';
import React from 'react';

export default function NextBtn({
  dispatch,

  index,
  numOfQuestions,
}) {
  const handleClick = () => {
    if (index === numOfQuestions - 1) {
      dispatch({ type: 'finishQuiz' });
      return;
    }
    dispatch({ type: 'nextQuestion' });
  };

  return (
    <button className="btn btn-ui" onClick={handleClick}>
      {index === numOfQuestions - 1 ? 'Finish' : 'Next'}
    </button>
  );
}
