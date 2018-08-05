import React from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'antd';

const { Meta } = Card;

class Feed extends React.Component {
    

    render() {
        return (
           <div>
               <br/>
               <br/>
               <main id="feed">
        <div class="photo">
            <header class="photo__header">
                <img src="http://www.cloudsellerpro.com/wp-content/uploads/2017/01/avatar-3.png" class="photo__avatar" />
                <div class="photo__user-info">
                    <span class="photo__author">Rahul jain</span>
                    <span class="photo__location">Best seller </span>
                </div>
            </header>
            <img src="product_images/NYC.jpg" />
            <div class="photo__info">
                <div class="photo__actions">
                    <span class="photo__action">
                        <i class="fa fa-heart-o fa-lg"></i>
                    </span>
                    <span class="photo__action">
                        <i class="fa fa-comment-o fa-lg"></i>
                    </span>
                </div>
                <span class="photo__likes">45 likes</span>
                <ul class="photo__comments">
                    <li class="photo__comment">
                        <span class="photo__comment-author">serranoarevalo</span> love this!
                    </li>
                    <li class="photo__comment">
                        <span class="photo__comment-author">serranoarevalo</span> love this!
                    </li>
                    <li class="photo__comment">
                        <span class="photo__comment-author">serranoarevalo</span> love this!
                    </li>
                    <li class="photo__comment">
                        <span class="photo__comment-author">serranoarevalo</span> love this!
                    </li>
                </ul>
                <span class="photo__time-ago">2 hours ago</span>
                <div class="photo__add-comment-container">
                    <textarea name="comment" placeholder="Add a comment..."></textarea>
                    <i class="fa fa-ellipsis-h"></i>
                </div>
            </div>
        </div>
    </main>
               </div>
                   
        )
    }
}

export default Feed;