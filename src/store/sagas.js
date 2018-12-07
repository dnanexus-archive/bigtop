import {put, call, takeEvery} from "redux-saga/effects";
import API from "api";

function *goFetchFile(action) {
  const {url} = action;
  try {
    const data = yield call(API.fetchJSON, url, null, {method: "GET"});
    yield put({type: action.successAction, data});
  } catch (error) {
    console.error(error);
  }
}

export function *watchFetchFile() {
  yield takeEvery("FETCH_FILE", goFetchFile);
}
