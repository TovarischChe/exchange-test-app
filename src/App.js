import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { setRates } from './actions';
import ExchangeFrom from './components/exchange-from.jsx';
import ExchangeTo from './components/exchange-to.jsx';
import RatesMonitor from './services/rates-monitor';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateRates = this.updateRates.bind(this);
    this.RatesMonitor = new RatesMonitor({
      interval: 10000,
      currencies: store.getState().currencies.list,
      ratesLoaded: this.updateRates,
    });
    this.RatesMonitor.start();
  }

  updateRates(data) {
    store.dispatch(setRates(data));
  }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <div>
            <ExchangeFrom />
            <ExchangeTo />
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
