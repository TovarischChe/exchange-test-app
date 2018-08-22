import { createStore } from 'redux';
import reducers from './reducers'
// import * from './actions'
// import _ from 'lodash';

const initialState = {
  funds: {
    available: [
      {
        currency: 'EUR',
        amount: 100,
      },
      {
        currency: 'USD',
        amount: 0,
      },
      {
        currency: 'GBP',
        amount: 20,
      },
    ],
    toExchange: 0,
  },
  rates: {},
  currencies: {
    list: [
      {
        code: 'EUR',
        symbol: '€',
      },
      {
        code: 'USD',
        symbol: '$',
      },
      {
        code: 'GBP',
        symbol: '£',
      },
    ],
    activeCurrencyIndex: {
      from: 0,
      to: 1,
    },
  },
};

const store = createStore(reducers, initialState);

export default store;
