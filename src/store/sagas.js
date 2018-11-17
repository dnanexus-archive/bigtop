import {put, call, takeEvery} from "redux-saga/effects";
import API from "api";

function *goFetchDataFile(action) {
  const {url} = action;
  try {
    const data = yield call(API.fetchJSON(url));
    yield put({type: "RECEIVED_DATA", data});
  } catch (error) {
    console.error(error);
  }
}

export function *watchFetchDataFile() {
  yield takeEvery("FETCH_DATA", goFetchDataFile);
}
