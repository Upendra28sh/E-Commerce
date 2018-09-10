import React from 'react';
import SellerPost from './SellerPost';
import UserPost from './UserPost';
import ProductFeed from './ProductFeed';
import {Query} from 'react-apollo';
import {GET_USER_FEED} from "../../query";
import Chat from '../chat';

class Feed extends React.Component {
    render() {
        return (
            <div id='feed'>
                <Query query={GET_USER_FEED}>
                    {({loading, error, data}) => {
                        if (loading)
                            return "Loading...";

                        if (error)
                            return "Error...";

                        data = data.getFeed ;
                        console.log("d",data);
                        return data.map((feedItem, index) => {
                            if (feedItem.refString === 'Product') {
                                return <ProductFeed key={index} product={feedItem.origin}/>;
                            } else if (feedItem.refString === 'Sellerpost') {
                                return <SellerPost key={index} post={feedItem.origin}/>;
                            } else if (feedItem.refString === 'Post') {
                                return <UserPost key={index} post={feedItem.origin}/>;
                            }
                        });

                    }}
                </Query>
                <Chat></Chat>
            </div>
        );
    }
}

export default Feed;