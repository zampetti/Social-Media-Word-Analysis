import { all, takeEvery, put } from "redux-saga/effects";
import {fetchSuccess, fetchFailure} from "../components/issueSlice";
import { sagaActions } from "./sagaActions";

type wordCount = {
    Word: string
    Count: number
}

type ngramCount = {
    Ngram: string
    Count: number
}

type IssueSagaReturn = {
    WordCount: wordCount[]
    Bigrams: ngramCount[]
    Trigrams: ngramCount[]
}
export function* fetchDataSaga() {
    try {
        let result:IssueSagaReturn = yield fetch("http://localhost:3000/twitter")
            .then(response => response.json() );
        // console.log("SAGA RESPONSE: ", result)
        yield put(fetchSuccess(result));
    } catch (e) {
        // console.log("FETCH FAILED")
        yield put(fetchFailure("FETCH FAILED"))
    }
}

function* fetchWatcher() {
    yield takeEvery(sagaActions.FETCH_DATA_SAGA, fetchDataSaga)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
      fetchWatcher(),
    ])
  }
