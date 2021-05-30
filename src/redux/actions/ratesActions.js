import axios from "axios";
import * as types from "./actionTypes";

export const loadRates = () => (dispatch) => {
  dispatch({ type: types.API_LOADING, loading: true });

  return axios
    .get(process.env.REACT_APP_API)
    .then((response) => {
      dispatch({ type: types.LOAD_RATES_SUCESS, data: response.data });
    })
    .catch(() => {
      dispatch({ type: types.API_ERROR, error: true });
      // log error somewhere
      // console.log("Error", e);
    })
    .then(() => {
      dispatch({ type: types.API_LOADING, loading: false });
    });
};

// // Retrieve API Data using Graphql + APolloc Client 3 + Rest Link
// // Doesnt work on node v8
// import client from "../apolloClient";
// import { gql } from "@apollo/client";
// const query = gql`
//   query Rates {
//     data @rest(type: "Rates", path: "rates") {
//       date
//       base
//       rates
//     }
//   }
// `;

// export const loadRates = () => (dispatch) => {
//   dispatch({ type: types.API_LOADING, loading: true });

//   return client
//     .query({
//       query,
//       errorPolicy: "all",
//     })
//     .then((response) => {
//       if (response?.data?.data) {
//         dispatch({ type: types.LOAD_RATES_SUCESS, data: response.data.data });
//       } else {
//         throw new Error("No data returned by API");
//       }
//     })
//     .catch(() => {
//       // log error somewhere
//       dispatch({ type: types.API_ERROR, error: true });
//     })
//     .finally(() => {
//       dispatch({ type: types.API_LOADING, loading: false });
//     });
// };

// //File  ../apolloClient
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { RestLink } from "apollo-link-rest";

// const restLink = new RestLink({
//   uri: "https://api.vatcomply.com/",
// });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: restLink,
// });

// export default client;
