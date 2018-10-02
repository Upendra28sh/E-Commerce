import React from 'react';
import SellerPost from './SellerPost';
import UserPost from './UserPost';
import ProductFeed from './ProductFeed';
import {Query} from 'react-apollo';
import {GET_USER_FEED} from "../../query";
import Chat from '../Chat';
import Details from "../Details";
import {ModalRoute} from 'react-router-modal';

class Feed extends React.Component {
    render() {
        return (
            <main id='feed' style={{overflow: 'hidden'}}>
                <Query query={GET_USER_FEED}>
                    {({loading, error, data}) => {
                        if (loading)
                            return "Loading...";

                        if (error)
                            return "Error...";

                        data = data.getFeed;
                        // console.log("d", data);
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
        );
    }
}

export default Feed;