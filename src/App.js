import { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_REPOSITORIES } from "./graphql";

import StarButton from "./StarButton";

const PER_PAGE = 5;

const defaultState = {
  first: PER_PAGE,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア",
};

const App = () => {
  const [variables, setVariables] = useState(defaultState);

  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, { variables });

  const showUserName = () => {
    if (loading) return "...Loading";
    if (error) return `Error ${error.message}`;

    const search = data.search;
    const repositoryCount = search.repositoryCount;
    const repositoryUnit =
      repositoryCount === 1 ? "Repository" : "Respositories";
    const title = `Github Repositories Search Results - ${repositoryCount} ${repositoryUnit}`;

    const goNext = (search) => {
      setVariables({
        ...variables,
        first: PER_PAGE,
        last: null,
        before: null,
        after: search.pageInfo.endCursor,
      });
    };

    const goPrevious = (search) => {
      setVariables({
        ...variables,
        first: null,
        after: null,
        last: PER_PAGE,
        before: search.pageInfo.startCursor,
      });
    };

    return (
      <>
        <h2>{title}</h2>
        <ul>
          {search &&
            search.edges.map((edge) => (
              <li>
                <a
                  key={edge.node.id}
                  href={edge.node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {edge.node.name}
                </a>
                &nbsp;
                <StarButton node={edge.node} />
              </li>
            ))}
        </ul>
        {search.pageInfo.hasPreviousPage && (
          <button type="button" onClick={() => goPrevious(search)}>
            Previous
          </button>
        )}
        {search.pageInfo.hasNextPage && (
          <button type="button" onClick={() => goNext(search)}>
            Next
          </button>
        )}
      </>
    );
  };

  const handleChange = (e) => {
    setVariables({ ...variables, query: e.target.value });
  };

  return (
    <>
      <form>
        <input value={variables.query} onChange={handleChange}></input>
      </form>
      <div>{showUserName()}</div>
    </>
  );
};

export default App;
