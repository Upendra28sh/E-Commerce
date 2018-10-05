import React, {Component} from 'react';
import {Query, withApollo} from 'react-apollo';
import {Link} from "react-router-dom";
import {GET_POST, UPDATE_POST_CAPTION} from '../../query';
import {Card, Row ,Col, Icon, Modal, Input, message} from "antd";


class UserPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            post: undefined
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    handleOk() {
        // update post caption to database.
        this.props.client.mutate({
            mutation: UPDATE_POST_CAPTION,
            variables: {input: {postID: this.state.post.id, caption: this.state.post.caption}}
        }).then(
            data => {
                data = data.data.updateUserPost;
                if (!!data) {
                    this.handleCancel();
                } else {
                    message.error("Try again later.")
                }
            }
        )
    }

    onChange(e) {
        let post = this.state.post;
        post.caption = e.target.value;

        this.setState({
            post: post
        });
    }

    render() {
        return (
            <div>
                <Query query={GET_POST} variables={{
                    username: this.props.username
                }}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return "Loading";
                        }
                        if (error) {
                            console.log(error);
                        }
                        data = data.UserPosts;
                        // console.log("User Posts : ", data);
                        return (
                            <Row gutter={16} style={{margin : 0}}>
                                {data.map(
                                    (post, index) => {
                                        return (
                                            <Col span={6} key={index}>
                                                <Card
                                                    key={index}
                                                    cover={<img src={post.product.image}/>}
                                                    actions={[<Icon type="edit" onClick={() => this.setState({visible: true, post: post})}/>]}
                                                >
                                                    <Card.Meta
                                                        title={<Link to={`/user/${this.props.username}/product/${post.product.id}`}>{post.product.name}</Link>}
                                                        description={post.caption}
                                                    />
                                                </Card>
                                            </Col>

                                        );
                                    }
                                )}
                            </Row>
                        );
                    }}
                </Query>
                <Modal
                    title="Edit Caption"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                >
                    {this.state.post ? (
                        <Input defaultValue={this.state.post.caption} onChange={this.onChange}/>
                    ) : <p>Loading...</p>}
                </Modal>
            </div>
        );
    }
}

export default withApollo(UserPosts);