import { useEffect, useReducer } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';

const initialState = {
  status: 'loading', //loading , error , ready , active , finished
  error: '',
  questions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        status: 'ready',
        questions: action.payload,
      };
    case 'startQuiz':
      return {
        ...state,
        status: 'active',
      };
    case 'dataFailed':
      return { ...state, status: 'error' };

    default:
      throw new Error('Unknown action');
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;

  useEffect(() => {
    async function getQuestions() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();

        dispatch({ type: 'dataReceived', payload: data });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    }

    getQuestions();
  }, []);

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

        {status === 'error' && <Error />}
      </Main>
    </div>
  );
}

export default App;
