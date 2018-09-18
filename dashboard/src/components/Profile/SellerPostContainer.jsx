import React, {Component} from 'react';
import { Query} from 'react-apollo';
import SellerPost from './SellerPost';
import {GET_POST_BY_SELLER} from '../Query/query';

class SellerPostContainer extends Component {
    render() {
        return (
            <main id="feed">
                <Query query={GET_POST_BY_SELLER} variables={{id: this.props.seller}}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return <p>Loading...</p>;
                        }
                        if (error) {
                            return <p>Error...</p>;
                        }
                        console.log(data);
                        data = data.getSellerPostBySeller;
                        return (
                            data.map((post, index) => {
                                console.log(post);
                                return (
                                    <SellerPost key={post.id} post={post}/>
                                );
                            }));
                    }}</Query>
            </main>
        );
    }
}


export default SellerPostContainer;