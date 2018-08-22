import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, CardTitle, Badge } from 'reactstrap';
import store from '../store';
import { exchange } from '../actions';
import {
  getNextCurrency,
  getPrevCurrency,
  getActiveCurrency,
} from '../reducers/currencies';
import {
  getActiveRate,
} from '../reducers/rates';

class ExchangeTo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ableToExchange: false,
      resultFunds: 0,
    };

    this.onExchangeButtonClick = this.onExchangeButtonClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let resultFunds = parseFloat(this.props.activeRate * this.props.fundsToExchange);
    resultFunds = resultFunds ? resultFunds.toFixed(2) : 0;
    if (resultFunds !== prevState.resultFunds) {
      this.setState({ resultFunds });
    }
    const ableToExchange = resultFunds > 0.0;
    if (ableToExchange !== prevState.ableToExchange) {
      this.setState({ ableToExchange });
    }
  }

  onExchangeButtonClick() {
    store.dispatch(exchange(
      this.props.fundsToExchange,
      this.props.activeFromCurrency,
      this.props.activeToCurrency,
      this.props.activeRate,
    ));
  }

  render() {
    return (
      <div className="container">
        <Card body>
          <CardTitle>to...</CardTitle>
          <div className="row">
            <div className="col text-center">
              <Button color="info" onClick={this.props.decreaseActiveCurrencyIndex}>
                { this.props.prevCurrency.symbol }
              </Button>
            </div>
            <div className="col-6 text-center">
              <h3>{ this.props.activeToCurrency.symbol }{ this.state.resultFunds }</h3>
            </div>
            <div className="col text-center">
              <Button color="info" onClick={this.props.increaseActiveCurrencyIndex}>
                { this.props.nextCurrency.symbol }
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              {
                this.props.sameCurrencies ?
                  <Badge color="warning">
                    Please select different currencies
                  </Badge> :
                  <Badge color="info">
                    { this.props.activeFromCurrency.symbol }
                    {'1 ='}
                    { this.props.activeToCurrency.symbol }
                    { this.props.activeRate }
                  </Badge>
              }
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <Button
                color={ this.state.ableToExchange ? 'success' : 'secondary' }
                disabled={ !this.state.ableToExchange }
                onClick={ this.onExchangeButtonClick }
              >Exchange</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeToCurrency: getActiveCurrency(state, 'to'),
  activeFromCurrency: getActiveCurrency(state, 'from'),
  funds: state.funds.available,
  prevCurrency: getPrevCurrency(state, 'to'),
  nextCurrency: getNextCurrency(state, 'to'),
  rates: state.rates,
  activeRate: getActiveRate(state, getActiveCurrency(state, 'from'), getActiveCurrency(state, 'to')),
  sameCurrencies: getActiveCurrency(state, 'from').code === getActiveCurrency(state, 'to').code,
  fundsToExchange: state.funds.toExchange,
});
const mapDispatchToProps = (dispatch, state) => {
  return({
    increaseActiveCurrencyIndex: () => {
      dispatch({
        type: 'INCREASE_ACTIVE_CURRENCY_INDEX',
        payload: {
          block: 'to',
        }
      })
    },
    decreaseActiveCurrencyIndex: () => {
      dispatch({
        type: 'DECREASE_ACTIVE_CURRENCY_INDEX',
        payload: {
          block: 'to',
        }
      })
    },
  })
}
const ExchangeToContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeTo)

export default ExchangeToContainer;
