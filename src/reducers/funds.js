const funds = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FUNDS_TO_EXCHANGE':
      const updated = { ...state, toExchange: action.payload };
      return updated
    case 'EXCHANGE':
        const willBeAvailable = [ ...state.available ];
        const deduct = parseInt(action.payload.funds, 10);
        if (!isNaN(deduct)) {
          const fromIndex = willBeAvailable.findIndex(cur => cur.currency === action.payload.from.code);
          const toIndex = willBeAvailable.findIndex(cur => cur.currency === action.payload.to.code);
          willBeAvailable[fromIndex].amount = Number((willBeAvailable[fromIndex].amount - deduct).toFixed(2));
          const add = parseFloat(action.payload.funds * action.payload.rate);
          willBeAvailable[toIndex].amount = Number((willBeAvailable[toIndex].amount + add).toFixed(2));
          return { available: willBeAvailable, toExchange: 0 }
        }
        return state
    default:
      return state
  }
}

export default funds;
