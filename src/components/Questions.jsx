import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';
import shuffleArray from '../helpers';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionsIndex: 0,
    };
  }

  showAlternatives = (currentQuestion) => {
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = currentQuestion;
    const alternatives = shuffleArray([...incorrectAnswers, correctAnswer]);
    return this.altVerification(alternatives, correctAnswer);
  }

  altVerification = (alternatives, correctAnswer) => {
    const checkAlts = alternatives.map((alt, index) => {
      if (alt === correctAnswer) {
        return (
          <Button key={ index } dataTestId="correct-answer">
            {alt}
          </Button>);
      }
      return (
        <Button key={ index } dataTestId={ `wrong-answer-${0}` }>
          {alt}
        </Button>
      );
    });
    return checkAlts;
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
          <section data-testid="answer-options">
            {randomAlternatives}
          </section>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.reducer.questions,
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Questions);
