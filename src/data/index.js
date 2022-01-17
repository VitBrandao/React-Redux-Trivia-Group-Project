const GAME_QUESTIONS_URL = 'https://opentdb.com/api.php?amount=5&token=';

export const fetchToken = async (URL) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchQuestions = async (token) => {
  try {
    const response = await fetch(`${GAME_QUESTIONS_URL}${token}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
