import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageEmail: '',
      score: 0,
    };
    this.fetchGravatarApi = this.fetchGravatarApi.bind(this);
  }

  componentDidMount() {
    this.fetchGravatarApi();
  }

  fetchGravatarApi() {
    const { email } = this.props;
    const gravatarEmail = md5(email).toString();

    const URL = `https://www.gravatar.com/avatar/${gravatarEmail}`;

    this.setState({ imageEmail: URL });
  }

  render() {
    const { name } = this.props;
    const { imageEmail, score } = this.state;

    return (
      <div>
        <img src={ imageEmail } alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">
          Olá,
          {' '}
          {name}
        </p>
        <span data-testid="header-score">
          {' '}
          {score}
          {' '}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.reducer.player.name,
  email: state.reducer.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
