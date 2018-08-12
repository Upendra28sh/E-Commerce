import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends Component {


    state = {
        addClass: ''
    };

    handleHover() {
        this.setState({
            addClass: 'animate'
        });
    }

    handleDHover() {
        this.setState({
            addClass: ''
        });
    }


    render() {
        return (
            <div className="make-3D-space" style={{margin: 'auto'}}>
                <div className={`product-card ${this.state.addClass}`}
                     onMouseEnter={() => this.handleHover()} onMouseLeave={() => this.handleDHover()}>
                    <div className="product-card__front">
                        <div className="product-card__shadow"/>
                        <div className='product-card__image'>
                            {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt.png"/> */}
                        </div>
                        <div className="product-card__overlay"/>
                        <Link to="/admin/listing/1234"><div className="product-card__view-details">View details</div></Link>
                        <div className="product-card__stats">
                            <div className="stats-container">
                                <span className="product-card__price">$39</span>
                                <span className="product-card__name">Adidas Originals</span>
                                <p>Men's running shirt</p>
                                <div className="product-card__options">
                                    <strong>SIZES</strong>
                                    <span>XS, S, M, L, XL, XXL</span>
                                    <strong>COLORS</strong>
                                    <div className="product-card__colors">
                                        <div className="c-blue"><span/></div>
                                        <div className="c-red"><span/></div>
                                        <div className="c-white"><span/></div>
                                        <div className="c-green"><span/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}


export default ProductCard;