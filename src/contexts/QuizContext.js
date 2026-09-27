import { createContext, useReducer, useEffect, useContext } from 'react';

const QuizContext = createContext(null);

const initialState = {
  //loading , error , ready , active , finished
  status: 'loading',
  error: '',
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
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
    case 'nextQuestion':
      return {
        ...state,
        index: state.index++,
        answer: null,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'finishQuiz':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case 'restartQuiz':
      return { ...state, status: 'ready', points: 0, index: 0, answer: null };
    case 'dataFailed':
      return { ...state, status: 'error' };

    default:
      throw new Error('Unknown action');
  }
}

export function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce(
    (acc, curQuestion) => (acc += curQuestion.points),
    0,
  );

  useEffect(() => {
    async function getQuestions() {
      try {
        const res = await fetch(
          'https://react-quiz-server-nine.vercel.app/questions',
        );
        const data = await res.json();

        dispatch({ type: 'dataReceived', payload: data });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    }

    getQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        dispatch,
        numOfQuestions,
        totalPoints,
        highScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
