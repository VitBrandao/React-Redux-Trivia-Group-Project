import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <span data-testid="feedback-text"> Tela de feedback </span>
      </div>
    );
  }
}

export default Feedback;
