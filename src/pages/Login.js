import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../reducer/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      disableButton: true,
    };

    this.verifyInputFields = this.verifyInputFields.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    }, () => this.verifyInputFields());
  }

  onSubmit(e) {
    e.preventDefault();

    const { history, setLogin } = this.props;
    const { name, email } = this.state;

    setLogin({ name, gravatarEmail: email });
    history.push('/jogo');
  }

  verifyInputFields() {
    const { name, email } = this.state;

    if (name.length > 0 && email.length > 0) {
      this.setState({
        disableButton: false,
      });
    } else {
      this.setState({
        disableButton: true,
      });
    }
  }

  render() {
    const { name, email, disableButton } = this.state;

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
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.onInputChange }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ disableButton }
          onClick={ this.onSubmit }
        >
          Play
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLogin: (payload) => dispatch(loginAction(payload)),
});

Login.propTypes = {
  setLogin: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
