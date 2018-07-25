import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
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
        })
        return <h2> {count} products found</h2> 
    }

    render() {
        const query = this.props.match.params.query.trim().toLowerCase();

        return (
            <div>
                <Row>
                    <Col span={10}>
                        <img id="search" src="/7ad35c4c.png" />
                    </Col>
                    <Col span={14} id="search_result">
                        <p>#{query}</p>
                        { this.renderCount(query) }
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className="products">
                            {
                                this.props.products.map((product, index) => {
                                    if (product.description.toLowerCase().includes(query)) {
                                        return (
                                            <Link 
                                                key={index} 
                                                to={"/shop/" + (index + 1)}
                                            >
                                                <img 
                                                    className="each_product" 
                                                    alt={product.description} 
                                                    key={index} 
                                                    src={product.product_url}
                                                />
                                            </Link>
                                        );
                                    }
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    state => state,
    actions
)(Search);