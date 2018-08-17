import React from 'react';
import {Link,Router} from 'react-router-dom';
import {connect} from 'react-redux';
import {Carousel} from 'antd' ;
import * as actions from '../../../actions/shop';
import ProductRouter from '../ProductRouter';

class Home extends React.Component {
    componentDidMount() {
        this.props.getProducts();
        console.log("Test",this.props.products);
    }

    render() {
        return (
            
            <div>
                <div className="container_40">
                    <div className="products">
                        {this.props.products.map((image, index) =>
                            <div key={index} className={'product'}>
                                <div className='image-container'>
                                    <Link to={"/shop/" + (index + 1)}>
                                        <img className="img_fluid" // each_product
                                             alt={image.description} key={index}
                                             src={`product_images/${image.image}`}/>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <ProductRouter/>
            </div>
            
        );
    }
}

const HomeContainer = connect(
    state => state,
    actions
)(Home);

export default HomeContainer;
