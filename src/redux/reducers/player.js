import { INCREASE_SCORE, ADD_LOGIN, INCREASE_CORRECT_ANSWERS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INCREASE_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case ADD_LOGIN:
    return {
      ...state,
      ...action.player,
    };
  case INCREASE_CORRECT_ANSWERS:
    return {
      ...state,
      assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default player;
