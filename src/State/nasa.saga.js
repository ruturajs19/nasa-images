import { put, takeLatest, all } from "redux-saga/effects";
import { reduxActions } from "./nasa.action";

const BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`;

function* fetchPOD() {
  try {
    yield put({ type: reduxActions.ShowModal, modalText: "Loading..." });
    const response = yield fetch(BASE_URL);
    if (!response.ok) {
      throw new Error();
    }
    const formattedResponse = yield response.json();
    yield put({ type: reduxActions.SavePOD, value: formattedResponse });
    yield put({ type: reduxActions.CloseModal, modalText: "" });
  } catch (error) {
    yield put({ type: reduxActions.SavePOD, value: {} });
    yield put({
      type: reduxActions.ShowModal,
      modalText: "Something Went Wrong. Please try Again!!!",
    });
  }
}

function* fetchSearchResults(action) {
  let url = new URL("https://images-api.nasa.gov/search"),
    params = { q: action.searchText };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  try {
    yield put({ type: reduxActions.ShowModal, modalText: "Loading..." });
    const response = yield fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    const formattedResponse = yield response.json();
    if (formattedResponse?.collection?.items?.length > 0) {
      yield put({
        type: reduxActions.SaveSearchResults,
        value: formattedResponse.collection.items,
      });
      yield put({ type: reduxActions.CloseModal, modalText: "" });
    } else {
      yield put({
        type: reduxActions.SaveSearchResults,
        value: [],
      });
      yield put({
        type: reduxActions.ShowModal,
        modalText: "No Results Found!!!",
      });
    }
  } catch (error) {
    yield put({ type: reduxActions.SaveSearchResults, value: [] });
    yield put({
      type: reduxActions.ShowModal,
      modalText: "Something Went Wrong. Please try Again!!!",
    });
  }
}

export function* watcher() {
  yield all([
    takeLatest(reduxActions.GetPOD, fetchPOD),
    takeLatest(reduxActions.GetSearchResults, fetchSearchResults),
  ]);
}
