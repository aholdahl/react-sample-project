import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer.js';

const rootReducer = combineReducers({
    sampleReducer,
});

export default rootReducer;