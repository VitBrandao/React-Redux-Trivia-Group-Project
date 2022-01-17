import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken, loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      player: {
        gravatarEmail: '',
        name: '',
      },
      disableButton: true,
    };
  }

  onButtonClick = (event) => {
    event.preventDefault();
    const { player } = this.state;
    const { getUserToken, setLogin, history } = this.props;
    getUserToken();
    this.saveToken();
    setLogin(player);
    history.push('/game');
  }

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState((prevState) => ({
      player: {
        ...prevState.player, [name]: value,
      },
    }), () => this.verifyInputFields());
  }

  verifyInputFields = () => {
    const { player: { gravatarEmail, name } } = this.state;

    if (name.length > 0 && gravatarEmail.length > 0) {
      this.setState({
        disableButton: false,
      });
    } else {
      this.setState({
        disableButton: true,
      });
    }
  }

  saveToken = () => {
    const { token } = this.props;
    return localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { player: { name, gravatarEmail }, disableButton } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.onInputChange }
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="gravatarEmail"
            value={ gravatarEmail }
            data-testid="input-gravatar-email"
            onChange={ this.onInputChange }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ disableButton }
          onClick={ this.onButtonClick }
        >
          Play
        </button>

        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>

      </div>
    );
  }
}

Login.defaultProps = {
  token: '',
};

Login.propTypes = {
  token: PropTypes.string,
  getUserToken: PropTypes.func.isRequired,
  setLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getUserToken: () => dispatch(getToken()),
  setLogin: (player) => dispatch(loginAction(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
