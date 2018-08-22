const currencies = (state = [], action) => {
  switch (action.type) {
    case 'INCREASE_ACTIVE_CURRENCY_INDEX':
      const increased = state.activeCurrencyIndex;
      increased[action.payload.block] =
        (increased[action.payload.block] + 1) % state.list.length;
      return Object.assign({}, state, {
        activeCurrencyIndex: increased,
      });
    case 'DECREASE_ACTIVE_CURRENCY_INDEX':
      const decreased = state.activeCurrencyIndex;
      decreased[action.payload.block] =
        (decreased[action.payload.block] - 1 + state.list.length) % state.list.length;
      return Object.assign({}, state, {
        activeCurrencyIndex: decreased,
      });
    default:
      return state
  }
}

export default currencies;

export function getFundsByCurrencyCode(state, currencyCode) {
  const funds = state.funds ? state.funds.available.find(f => f.currency === currencyCode) : false;
  return funds ? funds.amount : 0;
}

export function getActiveCurrency(state, block) {
  return state.currencies.list[state.currencies.activeCurrencyIndex[block]];
}

export function getNextCurrency(state, block) {
  const nextIndex =
    (state.currencies.activeCurrencyIndex[block] + 1) %
    state.currencies.list.length;
  return state.currencies.list[nextIndex];
}

export function getPrevCurrency(state, block) {
  const prevIndex =
    (
      state.currencies.activeCurrencyIndex[block] - 1 +
      state.currencies.list.length
    ) % state.currencies.list.length;
  return state.currencies.list[prevIndex];
}
