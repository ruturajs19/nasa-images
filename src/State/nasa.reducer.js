import { reduxActions } from "./nasa.action";

const initialState = {
  PODDetails: null,
  searchResults: [],
  modalText: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxActions.SavePOD:
      return {
        ...state,
        PODDetails: action.value,
      };
    case reduxActions.SaveSearchResults:
      return {
        ...state,
        searchResults: state.searchResults.concat(action.value),
      };
    case reduxActions.ShowModal:
      return {
        ...state,
        modalText: action.modalText,
      };
    case reduxActions.CloseModal:
      return {
        ...state,
        modalText: "",
      };
    default:
      return state;
  }
};

export default reducer;
