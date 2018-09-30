import React, {Component} from 'react';
import {Spin, Row, Col, Card} from "antd";
import {Link} from 'react-router-dom';
import {Query} from 'react-apollo';
import {GET_SELLER_POST} from './Query/query';

class Post extends Component {
    render() {
        return (
            <div>
                <h1>Your Posts <Link to="/addPost" style={{textDecoration:'none',color:'black'}}>+</Link></h1>
                <Query query={GET_SELLER_POST}>
                    {({loading, error, data}) => {
                        
                        if (loading)  return <Spin size='large' />
                        if (error)  return <p>Error</p>
                        console.log('dataofpost',data);
                        data = data.getSellerPostBySeller;
                        
                
                        return (
                            <Row>
                               {data.map(
                                   (post,index) => {
                                       return (
                                            <Col lg={6} md={12} xs={24} key={index} style={{padding: '10px'}}>
                                                <Card 
                                                    style={{margin: 'auto'}}
                                                    hoverable
                                                    cover={<img src={post.image} style={{height: '260px'}}/>}
                                                >
                                                    <Card.Meta 
                                                        title={post.caption}
                                                        description={`${post.comments.length} comments`}
                                                    />
                                                </Card>
                                            </Col>
                                       );
                                   }
                               )}
                            </Row>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default Post;