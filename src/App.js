import "./App.css";
import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { reduxActions } from "./State/nasa.action";
import PictureOfDay from "./Components/PictureOfDay/PictureOfDay";
import SearchResultsList from "./Components/SearchResults/SearchResultsList";
import Modal from "./Components/Modal/Modal";

function App(props) {
  const { PODDetails, getPOD, searchResults, getSearchResults } = props;

  useEffect(() => {
    if (!PODDetails) {
      getPOD();
    }
  }, [getPOD, PODDetails]);
  const submitHandler = (searchText) => {
    if (searchText && searchResults.length === 0) {
      getSearchResults(searchText);
    }
  };
  return (
    <div className="main-container">
      <h3>NASA Media Search</h3>
      <Modal />
      {searchResults.length > 0 ? (
        <SearchResultsList searchResults={searchResults} />
      ) : (
        PODDetails && (
          <PictureOfDay PODDetails={PODDetails} submitHandler={submitHandler} />
        )
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    PODDetails: state.PODDetails,
    searchResults: state.searchResults,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPOD: () => dispatch({ type: reduxActions.GetPOD }),
    getSearchResults: (searchText) =>
      dispatch({ type: reduxActions.GetSearchResults, searchText }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
