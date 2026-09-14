import React from 'react';

export default function StartScreen({ numOfQuestions, onCLick }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numOfQuestions} questions tpt est your React mastery</h3>
      <button className="btn" onClick={onCLick}>
        Lets's start!
      </button>
    </div>
  );
}
