// import client from "./client";
import { useQuery, gql } from "@apollo/client";

const ME = gql`
  query me {
    user(login: "iteachonudemy") {
      name
      avatarUrl
    }
  }
`;

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
