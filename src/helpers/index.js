const shuffleArray = (inputArray) => {
  const defaultValue = 0.5;
  const shuffled = inputArray.sort(() => Math.random() - defaultValue);
  return shuffled;
};

export default shuffleArray;
