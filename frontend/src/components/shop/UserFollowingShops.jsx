import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { GET_FOLLOW_SELLER } from '../query';

class UserPosts extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        let ids = [];
        this.props.ids.forEach(
            idObj => ids.push(idObj.id)
        );
        return (
            <div>
                <Query query={GET_FOLLOW_SELLER} variables={{
                    ids: ids
                }}>
                    {({loading, data}) => {
                        if (loading) {
                            return "Loading";
                        }
                        data = data.getSellers;
                        console.log(data);
                        
                        return data.map(
                            (seller, index) => {
                                return (
                                    <div key={index}>
                                        <p>{seller.name}</p>
                                        <p>{seller.shopname}</p>
                                        <p>{seller.about}</p>
                                    </div>
                                )
                            }
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default UserPosts;