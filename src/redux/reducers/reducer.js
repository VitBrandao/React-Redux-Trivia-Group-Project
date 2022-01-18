import {
  ADD_LOGIN,
  IS_LOADING,
  GET_QUESTIONS,
  STOP_TIMER,
  INCREASE_SCORE,
} from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
  questions: [],
  isLoading: false,
  stop: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN:
    return {
      ...state,
      player: {
        ...state.player,
        ...action.player,
      },
    };
  case IS_LOADING:
    return {
      ...state,
      isLoading: true,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
      isLoading: false,
    };
  case STOP_TIMER:
    return {
      ...state,
      stop: !action.stop,
    };
  case INCREASE_SCORE:
    return {
      player: {
        score: state.score + action.score,
      },
    };
  default:
    return state;
  }
};

export default reducer;
