import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const ADD_ORDER_CART = gql `
mutation ADD_ORDER_CART($address: String, $street: String, $city: String, $state: String, $zipcode: Int){
    addOrderFromCart(
        input:{
        userID:"5b79495957b3413063e7be4c",
        discount:1000,
        total:10000,
        date:"12-08-18",
        shipping:{
          status:"Confirmed",
          address:{
            address: $address,
            street: $street,
            city: $city,
            state: $state,
            zipcode: $zipcode
          }
        },
        status:{
          confirmed: true,
          packed: true,
          shipped: true,
          delivered: true
        },
        payment:{
          status:"Done",
          mode:"Net Banking"
        }
      }
    ) {
      order {
        id
        discount
        total
        shipping {
          status
          address {
            address
            street
            state
            city
            zipcode
          }
        }
        status {
          confirmed
          packed
          shipped
          delivered
        }
        products {
          product {
            id
            name
            price
            sellerID {
              name
              image
            }
          }
        }
      }
    }
  }
`;

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let address = e.target[0].value;
        let street = e.target[1].value;
        let city = e.target[2].value;
        let state = e.target[3].value;
        let zip = e.target[4].value;

        console.log(address, street, city, state, zip);
    }

    render() {
        return (
            <Mutation mutation={ADD_ORDER_CART}>
                {(addOrderFromCart, { data }) => (
                    <div className="bg-grey">
                        <div className="container_320">
                            <div className="form_title">
                                <h1>Checkout</h1>
                            </div>
                            <div className="form_content">
                                <form 
                                    className="checkout_form"
                                    onSubmit = {
                                        e => {
                                            e.preventDefault();
                                            addOrderFromCart({variables: {
                                                address: e.target[0].value,
                                                street: e.target[1].value,
                                                city: e.target[2].value,
                                                state: e.target[3].value,
                                                zipcode: e.target[4].value
                                            }})
                                            console.log(this.props);
                                        }
                                    }
                                >
                                    <label htmlFor="address">Address</label>    
                                    <input type="text" id="address" name="address"/>
                                    
                                    <label htmlFor="street">Street</label>
                                    <input type="text" id="street" name="street"/>
        
                                    <label htmlFor="city">City</label>
                                    <input type="text" id="city" name="city"/>
        
                                    <label htmlFor="name">State</label>
                                    <input type="text" id="state" name="state"/>
        
                                    <label htmlFor="pin">Zip</label>
                                    <input type="number" id="zip" name="zip"/>
                                    
                                    <button type="submit" className="submit_btn">Submit</button>
                                </form>
                            </div>
                        </div>
                        <p style={{paddingBottom: '10px', textAlign: 'center'}}>For help, contact us.</p>
                    </div>
                )}
            </Mutation>
           
        );
    }
}

export default Checkout;