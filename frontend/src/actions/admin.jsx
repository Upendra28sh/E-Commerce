import $ from 'jquery';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import createBrowserHistory from 'history/createBrowserHistory'
const BASEURL = 'http://localhost:4000';
// const BASEURL = 'http://192.168.0.104:4000';
const client = new ApolloClient({
    uri: "http://localhost:4000"
  });
  
const history = createBrowserHistory();

// Show products on home page
export function allOrders() {
    

    let asyncAction = function(dispatch) {
    client.query({
    query: gql`
    
    query{ allOrders {
        id
        discount
        shipping
          }
        }
    `
  })
  .then(result => console.log("test",result)) ;
    }
    return asyncAction;
}

