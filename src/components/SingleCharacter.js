import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import "./singleCharacter.scss";

const SingleCharacterQuery = gql`
  query($page: Int!, $character: String!) {
    characters(page: $page, filter: { name: $character }) {
      info {
        count
        next
        prev
        pages
      }
      results {
        name
        id
        image
        status
      }
    }
  }
`;

const SingleCharacter = () => {
  const [page, setPage] = useState(1);
  const [character, setCharacter] = useState("Rick");

  return (
    <div className="main">
      <input
        type="text"
        value={character}
        onChange={e => setCharacter(e.target.value)}
      />
      <div className="container">
        <Query variables={{ page, character }} query={SingleCharacterQuery}>
          {({
            loading,
            error,
            data: {
              characters: {
                info: { next, prev, pages, count } = {},
                results
              } = {}
            } = {}
          }) => {
            console.log(loading, error, results);

            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            next = next ? next : pages;
            prev = prev ? prev : 1;
            return (
              <>
                {results ? (
                  results.map(({ name, image, id, status }) => (
                    <>
                      <p className="card" key={id}>
                        <img src={image} alt={name} />
                        <br />
                        {name}
                        <p>{status}</p>
                      </p>
                    </>
                  ))
                ) : (
                  <p>no results</p>
                )}
                <div className="buttons">
                  <button type="button" onClick={() => setPage(prev)}>
                    Prev
                  </button>
                  <button type="button" onClick={() => setPage(next)}>
                    Next
                  </button>
                  <div>{paginationButton(pages, setPage, page)}</div>
                </div>
              </>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

const paginationButton = (pageCount, setPage, currentPage) => {
  const pageButtons = [];
  for (let i = 1; i <= pageCount; i++) {
    pageButtons.push(
      <button
        className={currentPage === i ? "btn active" : "btn"}
        key={i}
        onClick={() => setPage(i)}
      >
        {i}
      </button>
    );
  }

  console.log(pageButtons);
  return pageButtons;
};

export default SingleCharacter;
