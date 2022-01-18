import { INCREASE_SCORE, ADD_LOGIN } from '../actions';

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
  default:
    return state;
  }
};

export default player;
