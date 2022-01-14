export const ADD_LOGIN = 'ADD_LOGIN';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
};

export const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};
