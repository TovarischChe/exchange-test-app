export const setRates = (body) => {
  return { type: 'SET_RATES', payload: body }
}

export const exchange = (funds, from, to, rate) => {
  return {
    type: 'EXCHANGE',
    payload: { funds, from, to, rate },
  }
}
