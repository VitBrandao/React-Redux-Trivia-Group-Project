import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';
import shuffleArray from '../helpers';
import Timer from './Timer';
import { increaseScore, stopTimer } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionsIndex: 0,
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
    const { questionsIndex } = this.state;
    const { addScore, questions, player } = this.props;
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
    return localStorage.setItem('ranking', JSON.stringify(localStorageData));
  }

  handleClick = (event) => {
    event.preventDefault();
    const { stopCounter } = this.props;
    stopCounter();

    const btnClicked = event.target.className;
    if (btnClicked === 'correct') this.sumScore();

    const rightAnswer = document.querySelector('.correct');
    const wrongAnswer = document.querySelectorAll('.incorrect');
    const correctColor = '3px solid rgb(6, 240, 15)';
    const incorrectColor = '3px solid rgb(255, 0, 0)';
    rightAnswer.style.border = correctColor;
    wrongAnswer.forEach((answer) => {
      answer.style.border = incorrectColor;
    });
  }

  render() {
    const { questionsIndex } = this.state;
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
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  stopCounter: () => dispatch(stopTimer()),
  addScore: (point) => dispatch(increaseScore(point)),
});

const mapStateToProps = (state) => ({
  player: state.player,
  questions: state.reducer.questions,
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  addScore: PropTypes.func.isRequired,
  stopCounter: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertions: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
