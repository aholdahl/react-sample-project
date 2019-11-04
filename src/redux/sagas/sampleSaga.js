import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* sampleSaga() {
    try {
        console.log('Hello from sampleSaga')
    } catch (error) {
        console.log('Error in sampleSaga: ', error)
    }
}

function* sampleSagaRoot() {
    yield takeEvery('SAMPLE_SAGA', sampleSaga);
}

export default sampleSagaRoot;