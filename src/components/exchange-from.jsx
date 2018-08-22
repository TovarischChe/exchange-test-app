import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, CardTitle } from 'reactstrap';
import InputForm from './input-form';
import {
  getNextCurrency,
  getPrevCurrency,
  getActiveCurrency,
} from '../reducers/currencies';

class ExchangeFrom extends Component {
  render() {
    return (
      <div className="container">
        <Card body>
          <CardTitle>Exchange from...</CardTitle>
          <div className="row">
            <div className="col text-center">
              <Button color="info" onClick={this.props.decreaseActiveCurrencyIndex}>
                { this.props.prevCurrency.symbol }
              </Button>
            </div>
            <div className="col-6 text-center">
              <InputForm />
            </div>
            <div className="col text-center">
              <Button color="info" onClick={this.props.increaseActiveCurrencyIndex}>
                { this.props.nextCurrency.symbol }
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.currencies.list,
  activeFromCurrency: getActiveCurrency(state, 'from'),
  funds: state.funds.available,
  prevCurrency: getPrevCurrency(state, 'from'),
  nextCurrency: getNextCurrency(state, 'from'),
});
const mapDispatchToProps = (dispatch, state) => {
  return({
    increaseActiveCurrencyIndex: () => {
      dispatch({
        type: 'INCREASE_ACTIVE_CURRENCY_INDEX',
        payload: {
          block: 'from',
        }
      })
    },
    decreaseActiveCurrencyIndex: () => {
      dispatch({
        type: 'DECREASE_ACTIVE_CURRENCY_INDEX',
        payload: {
          block: 'from',
        }
      })
    },
  })
}
const ExchangeFromContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeFrom)

export default ExchangeFromContainer;
