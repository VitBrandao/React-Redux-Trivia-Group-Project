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

  render() {
    return (
      <div>
        <Header />
        { this.assertionsMessage() }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(Feedback);
