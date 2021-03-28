import React, { useEffect, useState } from "react";
import "./SearchResultsList.css";
import SearchItem from "../SearchItem/SearchItem";

export default function SearchResultsList(props) {
  const { searchResults } = props;
  const [indexes, createIndexes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const list = [];
    for (let i = 1; i <= searchResults.length / 10; i++) {
      list.push(i);
    }
    createIndexes(list);
  }, [searchResults]);

  const paginationHandler = (index) => {
    if (index <= searchResults.length) {
      setCurrentIndex(index - 1);
    }
  };

  return (
    <div className="search-results-container">
      {searchResults.length > 0 && (
        <div>
          {searchResults.slice(currentIndex, 5 + currentIndex).map((item) => {
            if (
              item &&
              item.links &&
              item.links[0] &&
              item.data &&
              item.data[0]
            ) {
              return (
                <SearchItem
                  imageUrl={item.links[0] && item.links[0].href}
                  imageTitle={item.data[0].title}
                  dateOfCreation={item.data[0].date_created}
                />
              );
            } else {
              return (
                <SearchItem imageUrl={""} imageTitle={""} dateOfCreation={""} />
              );
            }
          })}
          <div className="page-selector">
            {indexes.map((item) => (
              <p
                className={`page-index ${
                  item === Math.trunc(currentIndex / 5) + 1
                    ? "page-index-selected"
                    : ""
                }`}
                onClick={() => {
                  paginationHandler(item * 5);
                }}
              >
                {item}
              </p>
            ))}
            <p
              onClick={() =>
                paginationHandler(((currentIndex + 1) / 5 + 1) * 5)
              }
              className="page-index"
            >
              <b>Next{">>"}</b>
            </p>
          </div>
          <div className="related-searches">
            <h4>Related Searches</h4>
            <div className="related-searches-items">
              {searchResults[0].data[0].keywords?.map((keyWord) => (
                <p className="related-searches-item">{keyWord}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
