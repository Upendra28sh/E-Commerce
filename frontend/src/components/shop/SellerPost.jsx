import React, {Component} from 'react';
import {Query,Mutation} from 'react-apollo';
import {GET_POST_BY_SELLER,ADD_SELLER_COMMENT} from '../query'
import {Input,Icon} from 'antd'
class SellerPost extends Component {
    render() {
        return (
            <Query query={GET_POST_BY_SELLER} variables={{ shopname: this.props.shopname }}>
        {({ loading, data }) => {
            if (loading) {
                return <p>Loading...</p>;
              }
            data = data.SellerPosts;
            return (
            data.map((post,index)=>{
           
           return <main id="feed">
            <div className="photo">
                <header className="photo__header">
                    <img src="http://www.cloudsellerpro.com/wp-content/uploads/2017/01/avatar-3.png"
                         className="photo__avatar"/>
                    <div className="photo__user-info">
                        <span className="photo__author">{this.props.shopname}</span>
                        <span className="photo__location"></span>
                    </div>
                </header>
                <div className="photo__image">
                   <img src={`product_images/${post.image}`} />
                </div>
                <div className="photo__info" style={{textAlign:'left'}}>
                    <div className="photo__actions">
                            <span className="photo__action">
                                <i className="fa fa-heart-o fa-lg"/>
                            </span>
                        <span className="photo__action">
                                <i className="fa fa-comment-o fa-lg"/>
                            </span>
                    </div>
                    <span className="photo__likes">45 likes</span>
                    <ul className="photo__comments">
                   { post.Comments.map((comment)=>{
                      return <li className="photo__comment">
                      <span className="photo__comment-author">{comment.user!=null ? comment.user.name : ''}</span> {comment.text}
                  </li>
                   })}   
                    </ul>
                    <span className="photo__time-ago">2 hours ago</span>
                    <div className="photo__add-comment-container">
                    <Input name="comment" id={`${index}`} placeholder="Add a comment..."/>
                    <Mutation mutation={ADD_SELLER_COMMENT}>
                    {(addSellerComment)=>(
                        <i class="fa fa-send-o" onClick={() =>
                            addSellerComment({
                              variables: {
                                PostID: post.id,
                                text : document.getElementById(`${index}`).value
                              },
                              refetchQueries: ["sellerpost"],
                              update :()=>{document.getElementById(`${index}`).value =''}
                            })
                          }/>
                    )}
                    </Mutation>
                    </div>
                </div>
            </div>
            </main>}))
        }}</Query>
        );
    }
}


export default SellerPost;