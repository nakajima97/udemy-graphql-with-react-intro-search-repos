// import client from "./client";
import { useQuery } from "@apollo/client";
import { ME } from "./graphql";

const App = () => {
  const { loading, error, data } = useQuery(ME);

  const showUserName = () => {
    if (loading) return "...Loading";
    if (error) return `Error ${error.message}`;

    return <div>{data.user.name}</div>;
  };

  return (
    <>
      <div>Hello GraphQL</div>
      <div>{showUserName()}</div>
    </>
  );
};

export default App;
