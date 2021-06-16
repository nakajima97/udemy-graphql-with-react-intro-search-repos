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

    return <div>test</div>;
  };

  const handleChange = (e) => {
    setVariables({ ...variables, query: e.target.value });

    // eslint-disable-next-line
    console.log(e.target.value);
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
