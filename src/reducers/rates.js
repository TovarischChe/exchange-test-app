const rates = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RATES':
      return action.payload;
    default:
      return state
  }
}

export default rates;

export function getActiveRate(state, fromCurrency, toCurrency) {
  return state.rates[`${ fromCurrency.code }-${ toCurrency.code }`];
}
