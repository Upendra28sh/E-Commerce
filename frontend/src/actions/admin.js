import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const BASEURL = 'http://localhost:4000';
// const BASEURL = 'http://192.168.0.104:4000';

const client = new ApolloClient({
    uri: "http://localhost:4000"
});

// Add a product to DB
export function addProduct({name, price, description, image, seller}) {
    console.log(name, price, description, image, seller);
    const temp = () => {
        client.mutate({
            mutation: gql `
                mutation {
                    addProduct(
                        name: "${name}",
                        price: ${price},
                        image: "${image}",
                        description: "${description}",
                        sellerID: "${seller}" 
                    ) {
                        id
                        name
                        price
                        image
                        description
                        seller {
                            id
                            name
                        }
                    }
                }
            `
        }).then(
            result => console.log(result)
        ).catch(
            error => console.log(error)
        )
    }
    temp();
}

   
export function allOrders() {
    let asyncAction = function (dispatch) {
        client.query({
            query: gql`
            query { 
                allOrders {
                    id
                    discount
                    shipping
                }
            }
        `
        })
        .then(result => console.log("test", result));
    }
    return asyncAction;
}
