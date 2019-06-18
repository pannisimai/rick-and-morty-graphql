import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const SingleCharacterQuery = gql`
  query($character: String!) {
    characters(filter: { name: $character }) {
      info {
        count
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
  const [character, setCharacter] = useState("Rick");

  return (
    <div>
      <input
        type="text"
        value={character}
        onChange={e => setCharacter(e.target.value)}
      />
      <Query variables={{ character }} query={SingleCharacterQuery}>
        {({
          loading,
          error,
          data: { characters: { info, results } = {} } = {}
        }) => {
          console.log(loading, error, results);

          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <>
              {results.map(({ name, id }) => (
                <p key={id}>{name}</p>
              ))}
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default SingleCharacter;
