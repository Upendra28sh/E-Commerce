import React from 'react';

class Saved extends React.Component {

    render() {
        return (
            <div className="shoppingCart">
                <h1 className="cartHeading">Saved Products</h1>
                <table>
                    <tbody>
                        <tr className="tableHeaders">
                            <th></th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th className="deleteCol"></th>
                        </tr>
                        
                    {this.props.saved.map((item, index) =>
                        <tr key={index}>
                            <td><img className="cartImage" alt="cart thumbnail" key={index} src={item.image_url}></img></td>
                            <td>{item.name}</td>
                            <td>1</td>
                            <td>${item.price}.00</td>
                            <td 
                                onClick= {
                                    () => {
                                        if (this.props.token) {
                                            this.props.addToCart(this.props.saved[index], this.props.token)
                                            this.props.saved.splice(index,1);
                                        } else {
                                            this.props.emptyFields();
                                        }
                                    }
                                } 
                                className="deleteCol"
                            >
                                +
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                {
                    this.props.empty_fields?
                    <p style={{fontSize: '16px'}} className="message">Please log in or sign up</p> :
                    <p></p>
                }
            </div>
        )
    }
}

export default Saved;