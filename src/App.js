import { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_REPOSITORIES } from "./graphql";

const defaultState = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア",
};

const App = () => {
  const [variables, setVariables] = useState(defaultState);

  // eslint-disable-next-line
  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, { variables });

  const showUserName = () => {
    if (loading) return "...Loading";
    if (error) return `Error ${error.message}`;

    const search = data.search;
    const repositoryCount = search.repositoryCount;
    const repositoryUnit = repositoryCount < 2 ? "Repository" : "Respositories";
    const title = `Github Repositories Search Results - ${repositoryCount} ${repositoryUnit}`;

    // eslint-disable-next-line
    console.log(search);

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
              </li>
            ))}
        </ul>
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
