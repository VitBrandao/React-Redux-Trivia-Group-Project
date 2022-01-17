import React, { Component } from 'react';

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      counter: 30,
    };
  }

  componentDidMount() {
    this.questionTime();
  }

  questionTime = () => {
    const seconds = 1000;
    const time = 30000;
    const interval = setInterval(() => {
      this.setState((prevState) => ({
        counter: prevState.counter - 1,
      }));
    }, seconds);
    setTimeout(() => {
      clearInterval(interval);
      const { counter } = this.state;
      if (counter === 0) return this.timerCount();
    }, time);
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
        <p>{ counter }</p>
      </div>
    );
  }
}
