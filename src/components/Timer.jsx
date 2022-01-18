import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      counter: 30,
    };
  }

  componentDidMount() {
    this.questionTime();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  questionTime = () => {
    const seconds = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        counter: prevState.counter - 1,
      }), () => {
        const { isStoped } = this.props;
        const { counter } = this.state;
        if (isStoped === true) {
          clearInterval(this.interval);
        }
        if (counter <= 0) {
          clearInterval(this.interval);
          this.timerCount();
        }
      });
    }, seconds);
  }

  timerCount() {
    const { counter } = this.state;
    if (counter <= 0) {
      const rightAnswer = document.querySelector('.correct');
      const wrongAnswer = document.querySelectorAll('.incorrect');

      rightAnswer.disabled = true;

      wrongAnswer.forEach((answer) => {
        answer.disabled = true;
      });
    }
  }

  render() {
    const { counter } = this.state;
    return (
      <div>
        <p className="game-counter">{ counter }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  isStoped: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isStoped: state.reducer.stop,
});

export default connect(mapStateToProps, null)(Timer);
