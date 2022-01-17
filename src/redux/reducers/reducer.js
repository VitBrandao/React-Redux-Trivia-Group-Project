import { ADD_LOGIN, IS_LOADING, GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  player: {
    gravatarEmail: '',
    name: '',
    // assertions: '',
    // score: '',
  },
  questions: [],
  isLoading: false,
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
  default:
    return state;
  }
};

export default reducer;
