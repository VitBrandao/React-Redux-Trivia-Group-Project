import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  assertionsMessage = () => {
    const { assertions } = this.props;
    const magicNumber = 3;
    if (assertions < magicNumber) {
      return <span data-testid="feedback-text">Could be better...</span>;
    }
    return <span data-testid="feedback-text">Well Done!</span>;
  }

  redirectToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { assertions, totalScore } = this.props;
    return (
      <div>
        <Header />
        {this.assertionsMessage()}

        <div>
          <label htmlFor="total-score">
            Placar final:
            <p data-testid="feedback-total-score" id="total-score">
              { totalScore === 0 ? '0' : totalScore }
            </p>
          </label>

          <label htmlFor="total-question">
            Número de acertos:
            <p data-testid="feedback-total-question" id="total-question">
              { assertions === 0 ? '0' : assertions }
            </p>
          </label>
        </div>

        <button
          type="button"
          onClick={ this.redirectToLogin }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  totalScore: state.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
