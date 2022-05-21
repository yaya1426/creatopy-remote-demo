import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

function createIsomorphLink() {
  return new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
    credentials: "same-origin",
  });
}

const authLink = setContext((_, { headers }) => {
  let token: string | null = "";
  // get the authentication token from local storage if it exists
  if (typeof window !== "undefined") {
    token = sessionStorage.getItem("access_token");
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(createIsomorphLink()),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
