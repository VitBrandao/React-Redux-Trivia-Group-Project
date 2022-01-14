export const GET_TOKEN = 'GET_TOKEN';

const INITIAL_STATE = {
  token: '',
}

export const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return { ...state, token: action.token };
  default:
    return state;  
  }
}
