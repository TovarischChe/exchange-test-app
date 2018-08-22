import axios from 'axios';

const ENDPOINT = 'https://api.exchangeratesapi.io/latest';
const MAX_REQUEST_FAILURES = 5;

export default class RatesMonitor {
  constructor(props) {
    this.interval = props.interval;
    this.ratesLoaded = props.ratesLoaded;
    this.currencies = props.currencies.map((cur) => cur.code);
    this.baseCurrency = this.currencies[0];
    this.otherCurrencies = this.currencies.filter((cur) => cur !== this.baseCurrency);
    this.requestFailures = 0;

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.tick = this.tick.bind(this);
  }

  start() {
    this.intervalKey = setInterval(this.tick, this.interval);
    this.tick();
  }

  stop() {
    clearInterval(this.intervalKey);
  }

  tick() {
    return axios.get(`${ENDPOINT}?base=${this.baseCurrency}&symbols=${this.otherCurrencies.join(',')}`)
    .then((response) => {
      this.requestFailures = 0;
      this.parsePairs(response.data);
    })
    .catch((error) => {
      this.requestFailures += 1;
      if (this.requestFailures === MAX_REQUEST_FAILURES) {
        this.stop();
      }
      console.error(error);
    })
  }

  parsePairs(data) {
    const pairs = {};
    for (let cur in data.rates) {
      pairs[`${data.base}-${cur}`] = data.rates[cur];
      pairs[`${cur}-${data.base}`] = parseFloat((1 / data.rates[cur]).toFixed(4));
    }
    for (let cur in data.rates) {
      const otherRates = { ...data.rates };
      delete otherRates[cur];
      for (let otherCur in otherRates) {
        const ratio = pairs[`${data.base}-${otherCur}`] / pairs[`${data.base}-${cur}`];
        pairs[`${cur}-${otherCur}`] = parseFloat(ratio.toFixed(4));
      }
    }
    this.ratesLoaded(pairs);
  }
}
