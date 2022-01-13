export const ADD_LOGIN = 'ADD_LOGIN';
export const GET_TOKEN = 'GET_TOKEN';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  token: '',
};

export const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN:
    return { ...state, ...action.payload };
  case GET_TOKEN:
    return { ...state, token: action.payload.token };
  default:
    return state;
  }
};
