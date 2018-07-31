import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../actions/shop';

class Search extends React.Component {

    componentDidMount() {
        this.props.getProducts();
    }

    renderCount(query) {
        let count = 0;
        this.props.products.map(
            product => {
                if (product.description.toLowerCase().includes(query)) {
                    count += 1;
                }
            });
        return <span><span>{count}</span> products found</span>;
    }

    render() {
        const query = this.props.match.params.query.trim().toLowerCase();

        return (
            <div className=' bg-grey'>
                <div className="container">
                    <div className="">
                        <Row className='search-result'>
                            <Col span={6}>
                                <div className='search-result__image'>
                                    <img className='' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV9e0xcioHeH_3D7blQUumfnZQEgdveoWYdhEtP8qgGEN_xSxf"/>
                                </div>
                            </Col>
                            <Col span={18} className="search-result__text">
                                <h1>#{query}</h1>
                                {this.renderCount(query)}
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col span={24}>
                            <div className="products">
                                {this.props.products.map((image, index) =>
                                    <div key={index} className={'product'}>
                                        <div className='image-container'>
                                            <Link to={"/shop/" + (index + 1)}>
                                                <img className="img_fluid" // each_product
                                                     alt={image.description} key={index}
                                                     src={image.image_url}/>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state,
    actions
)(Search);