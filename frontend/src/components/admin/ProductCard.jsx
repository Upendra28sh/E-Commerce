import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
                        <div className='product-card__image' style={{backgroundImage : `url("/product_images/${this.props.product.image}")`}}>
                            {/*<img className={'img-fluid'} src={`product_images/${this.props.product.image}`}/>*/}
                        </div>
                        <div className="product-card__overlay"/>
                        <Link to="/admin/listing/1234">
                            <div className="product-card__view-details">View details</div>
                        </Link>
                        <div className="product-card__stats">
                            <div className="stats-container">
                                <span className="product-card__price">₹{this.props.product.price}</span>
                                <span className="product-card__name">{this.props.product.name}</span>
                                <p>{this.props.product.description}</p>
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
