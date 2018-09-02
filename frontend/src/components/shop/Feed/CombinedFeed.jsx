import React from 'react';
import SellerPost from './SellerPost';
import UserPost from './UserPost';
import ProductFeed from './ProductFeed'

class Feed extends React.Component {
    render() {
        return (
            <div id='feed'>
                <SellerPost/>
                <UserPost/>
                <ProductFeed/>
            </div>
        );
    }
}

export default Feed;