import { combineReducers } from 'redux';
import rates from './rates';
import funds from './funds';
import currencies from './currencies';

const appReducers = combineReducers({
	funds,
	rates,
	currencies,
});

export default appReducers;
