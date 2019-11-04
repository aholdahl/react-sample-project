import { all } from 'redux-saga/effects';
import sampleSaga from './sampleSaga.js';

function* rootSaga() {
    yield all ([
        sampleSaga(),
    ])
}

export default rootSaga;