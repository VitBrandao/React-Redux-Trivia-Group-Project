import { fetchToken, fetchQuestions } from '../../data';
import { GET_TOKEN } from '../reducers/token';

const REQUEST_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const ADD_LOGIN = 'ADD_LOGIN';
export const IS_LOADING = 'IS_LOADING';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const STOP_TIMER = 'STOP_TIMER';
export const INCREASE_SCORE = 'INCREASE_SCORE';
export const INCREASE_CORRECT_ANSWERS = 'INCREASE_CORRECT_ANSWERS';

export const loginAction = (player) => ({
  type: ADD_LOGIN,
  player,
});

export const saveToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const saveQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export const onLoad = () => ({
  type: IS_LOADING,
});

export const stopTimer = (stop) => ({
  type: STOP_TIMER,
  stop,
});

export const increaseScore = (score) => ({
  type: INCREASE_SCORE,
  score,
});

export const increaseCorrectAnswers = (assertions) => ({
  type: INCREASE_CORRECT_ANSWERS,
  assertions,
});

export const getQuestionsApi = (token) => async (dispatch) => {
  const FAIL_CODE = 3;
  const data = await fetchQuestions(token);
  if (data.response_code === FAIL_CODE) {
    const request = await fetchToken(REQUEST_TOKEN);
    const requestData = await fetchQuestions(request.token);
    dispatch(saveQuestions(requestData.results));
  } else {
    dispatch(saveQuestions(data.results));
  }
};

export const getToken = () => async (dispatch) => {
  dispatch(onLoad());
  const data = await fetchToken(REQUEST_TOKEN);
  dispatch(saveToken(data.token));
  dispatch(getQuestionsApi(data.token));
};
