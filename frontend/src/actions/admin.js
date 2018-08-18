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
    

    let asyncAction = function(dispatch) {
    client.query({
    query: gql`
    
        query{ 
                allOrders{
                        id
                        date
                        user {
                             name
                                }
                        city
                        Shipped
                        Confirmed
                        Delivered
                        Packed
                        Total
                        PayStatus
                        }
            }
    `
  })
  .then(result => dispatch({
    type: 'get-orders',
    payload: result.data.allOrders
   })) ;
    }
    return asyncAction;
}
export function getOrder(id) {
    

    let asyncAction = function(dispatch) {
    client.query({
    query: gql`
    
    query {
        Order(id: "${id}") {
          id
          date
          user {
            name
          }
          city
          Shipped
          Confirmed
          Delivered
          paymode
          Packed
          Total
          PayStatus
          products {
            name
            image
          }
        }
      }
    `
  })
  .then(result => dispatch({
    type: 'get-order',
    payload: result.data.Order
   })) ;
    }
    return asyncAction;
}
export function addOrder(userid,productids,discount,shipping,Confirmed,Delivered,Shipped,Packed,paymode,PayStatus,city,Total) {
    

    const temp = () => {
        client.mutate({
            mutation: gql `
            mutation {
                addOrder(
                  userID: "${userid}"
                  productIDs: ${productids}
                  discount: ${discount}
                  shipping: ${shipping}
                  Confirmed: ${Confirmed}
                  Delivered: ${Delivered}
                  Shipped:${Shipped}
                  Packed : ${Packed}
                  date: ${Date.now()/1000}
                  paymode:"${paymode}"
                  PayStatus:"${PayStatus}"
                  city:"${city}"
                  Total:${Total}
                  
                ) {
                  id
                  shipping
                  discount
                  products {
                    id
                    image
                    name
                    description
                  }
                  user {
                    id
                    name
                    about
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

export function removeOrder(id) {
    

    const temp = () => {
        client.mutate({
            mutation: gql `
        

        mutation{
            removeOrder(orderID:"${id}"){
            id
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
//Sellers action
export function addSeller(name,image,about) {
    

    const temp = () => {
        client.mutate({
            mutation: gql `
        
    mutation{
        addSeller(name:"${name}",image:"${image}",about:"${about}"){
          id
          name
          about
          image
        }
      }
        `
    }).then(
        result => console.log(result)
    ).catch(
        error => console.log(error)
    )
}
temp()
}
export function allSeller() {
    

    let asyncAction = function(dispatch) {
    client.query({
    query: gql`
    {
        allSellers{
          id
          about
          image
          name
        }
      }
        `
     })
  .then(result => dispatch({
    type: 'get-sellers',
    payload: result.data.allSellers
   })) ;
    }
    return asyncAction;
}
export function removeSeller(id) {
    

    const temp = () => {
        client.mutate({
            mutation: gql `
        

            mutation{
                removeSeller(sellerID:"${id}"){
                  id
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
export function getSeller(id) {
    

    let asyncAction = function(dispatch) {
    client.query({
    query: gql`
        
    {
        Seller(id:"${id}"){
          id
          name
          about
          image
        }
      }
          
        `
     })
  .then(result => dispatch({
    type: 'get-sellerdetail',
    payload: result.data.Seller
   })) ;
    }
    return asyncAction;
}
//User action
export function allUsers() {
    

    let asyncAction = function(dispatch) {
    client.query({
    query: gql`
        
    query {
        allUsers{
          id
          about
          name
          email
          order
          Total
          City
          Latest
          Contact
        }
      }
          
        `
     })
  .then(result => dispatch({
    type: 'get-users',
    payload: result.data.allUsers
   })) ;
    }
    return asyncAction;
}
