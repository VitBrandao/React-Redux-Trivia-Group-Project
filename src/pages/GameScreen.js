import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Questions from '../components/Questions';

class GameScreen extends React.Component {
  render() {
    const { loading, questions, history } = this.props;
    return (
      <div>
        <Header />
        {loading && <Loading />}
        {questions.length !== 0 && <Questions history={ history } />}
      </div>
    );
  }
}

GameScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.isLoading,
  questions: state.reducer.questions,
});

export default connect(mapStateToProps)(GameScreen);
