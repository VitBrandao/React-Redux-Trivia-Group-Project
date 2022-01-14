export const GET_TOKEN = 'GET_TOKEN';

let INITIAL_STATE = '';

export const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    INITIAL_STATE = action.token;
    return INITIAL_STATE;
  default:
    return state;
  }
};
