import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../redux/actions';

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
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  async onButtonClick() {
    const { getToken } = this.props;
    await getToken();

    this.saveToken();

    const { history } = this.props;
    history.push('/game');
  }

  onInputChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    }, () => this.verifyInputFields());
  }

  saveToken() {
    const { token } = this.props;

    return localStorage.setItem('token', JSON.stringify(token.token));
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
          onClick={ this.onButtonClick }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
