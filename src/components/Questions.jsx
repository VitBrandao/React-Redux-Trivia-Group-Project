import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';
import shuffleArray from '../helpers';
import Timer from './Timer';
import { increaseCorrectAnswers, increaseScore, stopTimer } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionsIndex: 0,
      questionsCorrect: 0,
      isSuffled: false,
      suffledArray: [],
    };
  }

  showAlternatives = (currentQuestion) => {
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = currentQuestion;

    const { isSuffled } = this.state;

    if (isSuffled === false) {
      const alternatives = shuffleArray([...incorrectAnswers, correctAnswer]);
      this.setState({
        suffledArray: alternatives,
        isSuffled: true,
      });
    }

    return this.altVerification(correctAnswer);
  }

  altVerification = (correctAnswer) => {
    const { suffledArray } = this.state;

    const checkAlts = suffledArray.map((alt, index) => {
      if (alt === correctAnswer) {
        return (
          <Button
            key={ index }
            dataTestId="correct-answer"
            className="correct"
            onClick={ this.handleClick }
          >
            {alt}
          </Button>);
      }
      return (
        <Button
          key={ index }
          dataTestId={ `wrong-answer-${index}` }
          className="incorrect"
          onClick={ this.handleClick }
        >
          {alt}
        </Button>
      );
    });
    return checkAlts;
  }

  sumScore = () => {
    const { questionsIndex, questionsCorrect } = this.state;
    const { addScore, addAssertions, questions, player } = this.props;
    const { name, gravatarEmail } = player;
    const getCurrentTime = document.querySelector('.game-counter').innerHTML;
    const hardScore = 3;
    const defaultPoint = 10;
    let difficultyPoint = 0;
    const questionDifficulty = questions[questionsIndex].difficulty;

    if (questionDifficulty === 'easy') {
      difficultyPoint = 1;
    }
    if (questionDifficulty === 'medium') {
      difficultyPoint = 2;
    }
    if (questionDifficulty === 'hard') {
      difficultyPoint = hardScore;
    }

    const score = defaultPoint + (Number(getCurrentTime) * difficultyPoint);
    const localStorageData = [{
      name,
      score,
      picture: gravatarEmail,
    }];

    addScore(score);
    addAssertions(questionsCorrect);
    return localStorage.setItem('ranking', JSON.stringify(localStorageData));
  }

  handleClick = ({ target: { className } }) => {
    const { stopCounter } = this.props;
    stopCounter();
    if (className === 'correct') {
      this.setState((prevState) => ({
        questionsCorrect: prevState.questionsCorrect + 1,
      }), () => this.sumScore());
    }

    const rightAnswer = document.querySelector('.correct');
    const wrongAnswer = document.querySelectorAll('.incorrect');
    const correctColor = '3px solid rgb(6, 240, 15)';
    const incorrectColor = '3px solid rgb(255, 0, 0)';
    rightAnswer.style.border = correctColor;
    wrongAnswer.forEach((answer) => {
      answer.style.border = incorrectColor;
    });

    this.createNextButton();
  }

  createNextButton = () => {
    this.setState({
      isAnswerSelected: true,
    });
  }

  showNextQuestion = () => {
    const { questionsIndex } = this.state;
    const { history } = this.props;

    this.setState({
      isAnswerSelected: false,
      isSuffled: false,
      suffledArray: [],
    });

    const magicNumber = 4;
    if (questionsIndex < magicNumber) {
      this.setState({
        questionsIndex: questionsIndex + 1,
      });
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { questionsIndex, isAnswerSelected } = this.state;
    const { questions } = this.props;
    const currentQuestion = questions[questionsIndex];
    const { category, question } = currentQuestion;
    const randomAlternatives = this.showAlternatives(currentQuestion);

    return (
      <main>
        <div>
          <h1 data-testid="question-category">{category}</h1>
          <p data-testid="question-text">{question}</p>
        </div>
        <div>
          <section data-testid="answer-options" id="answer-options">
            { randomAlternatives }
          </section>
        </div>
        <Timer />

        { isAnswerSelected ? (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.showNextQuestion }
          >
            Next
          </button>
        ) : null }
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  stopCounter: () => dispatch(stopTimer()),
  addScore: (point) => dispatch(increaseScore(point)),
  addAssertions: (assertion) => dispatch(increaseCorrectAnswers(assertion)),
});

const mapStateToProps = (state) => ({
  player: state.player,
  questions: state.reducer.questions,
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  addScore: PropTypes.func.isRequired,
  addAssertions: PropTypes.func.isRequired,
  stopCounter: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertions: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
