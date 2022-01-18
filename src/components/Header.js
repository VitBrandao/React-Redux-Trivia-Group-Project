import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageEmail: '',
      // score: 0,
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
    const { name, globalScore } = this.props;
    const { imageEmail } = this.state;

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
          {globalScore}
          {' '}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  globalScore: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  globalScore: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
