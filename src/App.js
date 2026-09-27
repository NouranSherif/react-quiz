import { useEffect, useReducer, useRef } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import Progress from './components/Progress';
import { useQuiz } from './contexts/QuizContext';
import FinishScreen from './components/FinishScreen';
import NextBtn from './components/NextBtn';
import Timer from './components/Timer';

function App() {
  const {
    questions,
    status,
    index,
    answer,
    points,
    dispatch,
    numOfQuestions,
    totalPoints,
    highScore,
  } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'ready' && (
          <StartScreen
            onCLick={() => dispatch({ type: 'startQuiz' })}
            numOfQuestions={numOfQuestions}
          />
        )}
        {status === 'active' && (
          <>
            <Progress
              points={points}
              totalPoints={totalPoints}
              index={index}
              numOfQuestions={numOfQuestions}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
              numOfQuestions={numOfQuestions}
            />
            {answer !== null && (
              <NextBtn
                dispatch={dispatch}
                index={index}
                numOfQuestions={numOfQuestions}
              />
            )}
            <Timer numOfQuestions={numOfQuestions} dispatch={dispatch} />
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
        {status === 'error' && <Error />}
      </Main>
    </div>
  );
}

export default App;
