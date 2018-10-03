import React from 'react';
import {Modal, Button} from 'antd';
import {Link} from 'react-router-dom';
import SellerPost from './SellerPost';
import UserPost from './UserPost';
import ProductFeed from './ProductFeed';
import {Query} from 'react-apollo';
import {GET_USER_FEED} from "../../query";
import Chat from '../Chat';
import Details from "../Details";
import {ModalRoute} from 'react-router-modal';

class Feed extends React.Component {
    state = {
        visible: !!localStorage.getItem('accessToken') 
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <div>
                <Modal
                    visible={this.state.visible}
                    title="Connect with Facebook"
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <Button key="back" onClick={this.handleCancel.bind(this)}>Return</Button>,
                        <Link key="submit" to="/facebook/">
                            <Button type="primary">
                                Connect
                            </Button>
                        </Link>
                    ]}
                >
                    <p>Connect to your Facebook friends</p>
                </Modal>
                <main id='feed' style={{overflow: 'hidden'}}>
                    <Query query={GET_USER_FEED}>
                        {({loading, error, data}) => {
                            if (loading)
                                return "Loading...";

                            if (error)
                                return "Error...";

                            data = data.getFeed;
                            console.log("d", data);
                            return data.map((feedItem, index) => {
                                if (feedItem.refString === 'Product') {
                                    return <ProductFeed key={index} product={feedItem.origin} parentFeedId={feedItem.id}/>;
                                } else if (feedItem.refString === 'Sellerpost') {
                                    return <SellerPost key={index} post={feedItem.origin} parentFeedId={feedItem.id}/>;
                                } else if (feedItem.refString === 'UserPost') {
                                    return <UserPost key={index} post={feedItem.origin} parentFeedId={feedItem.id}/>;
                                }
                            });

                        }}
                    </Query>
                    <ModalRoute
                    path={`${this.props.match.url}/product/:id`}
                    parentPath={this.props.match.url}
                    component={Details}/>
                    {/*<Chat></Chat>*/}
                </main>
            </div>
        );
    }
}

export default Feed;