import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

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
      }
    }
  }
`;

const SingleCharacter = () => {
  const [page, setPage] = useState(1);
  const [character, setCharacter] = useState("Rick");

  return (
    <div>
      <input
        type="text"
        value={character}
        onChange={e => setCharacter(e.target.value)}
      />
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

          next = next ? next : 1;
          prev = prev ? prev : 1;
          return (
            <>
              {count > 0 && count}
              {results ? (
                results.map(({ name, id }) => <p key={id}>{name}</p>)
              ) : (
                <p>no results</p>
              )}
              <button type="button" onClick={() => setPage(prev)}>
                Prev
              </button>
              <button type="button" onClick={() => setPage(next)}>
                Next
              </button>
              <div>{paginationButton(pages, setPage, next - 1)}</div>
            </>
          );
        }}
      </Query>
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
