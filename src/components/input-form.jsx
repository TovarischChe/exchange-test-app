import React, { Component } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  FormGroup,
  FormText,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  getFundsByCurrencyCode,
  getActiveCurrency,
} from '../reducers/currencies';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeFromCurrency.code !== prevProps.activeFromCurrency.code) {
      this.updateAmount(this.state.value);
    }
    if (
      this.props.fundsToExchange === 0
      && prevProps.fundsToExchange !== 0
      && this.props.fundsToExchange !== this.state.value
    ) {
      this.setState({ value: this.props.fundsToExchange });
    }
  }

  handleChange(event) {
    this.updateAmount(event.target.value);
  }

  updateAmount(amount) {
    const validationResults = this.validate(amount);
    if (validationResults.success) {
      this.setState({
        value: validationResults.value,
        errors: [],
      }, () => {
        this.props.setFundsToExhange(this.state.value);
      });
    } else {
      this.setState({
        value: amount,
        errors: validationResults.errors,
      }, () => {
        this.props.setFundsToExhange(0);
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  validate(number) {
    const parsed = parseInt(number, 10);
    const enoughFunds = this.props.activeFromCurrencyFunds >= parsed;
    if (!isNaN(parsed) && enoughFunds) {
      return {
        success: true,
        value: parsed,
      }
    }
    return {
      success: false,
      errors: [
        isNaN(parsed) ? `Please enter number` : '',
        !enoughFunds && parsed ? `Please enter number not greater than ${ parseInt(this.props.activeFromCurrencyFunds, 10) }` : '',
      ]
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              { this.props.activeFromCurrency.code }
            </InputGroupAddon>
            <Input
              className="text-right"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </InputGroup>
          <FormText color="muted" className="text-left">
            You have
            {' '}
            { this.props.activeFromCurrency.symbol }
            { this.props.activeFromCurrencyFunds }
          </FormText>
          <FormText className="text-right">
            { this.state.errors ? this.state.errors.map((err, index) => {
              return <span className="text-danger" key={ index }>{ err }</span>
            }) : [] }
          </FormText>
      </FormGroup>
    </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.currencies.list,
  activeFromCurrency: getActiveCurrency(state, 'from'),
  funds: state.funds.available,
  activeFromCurrencyFunds: getFundsByCurrencyCode(state, getActiveCurrency(state, 'from').code),
  fundsToExchange: state.funds.toExchange,
});

const mapDispatchToProps = (dispatch, state) => {
  return({
    setFundsToExhange: (value) => {
      dispatch({
        type: 'SET_FUNDS_TO_EXCHANGE',
        payload: value
      })
    },
  })
}

const InputFormContainer = connect(
  mapStateToProps, mapDispatchToProps,
)(InputForm)

export default InputFormContainer;
