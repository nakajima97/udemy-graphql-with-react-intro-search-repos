import { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_REPOSITORIES } from "./graphql";

const VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア",
};

const App = () => {
  // eslint-disable-next-line
  const [variables, setVariables] = useState(VARIABLES);

  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, { variables });

  const showUserName = () => {
    if (loading) return "...Loading";
    if (error) return `Error ${error.message}`;

    return <div>test</div>;
  };

  return (
    <>
      <div>{showUserName()}</div>
    </>
  );
};

export default App;
