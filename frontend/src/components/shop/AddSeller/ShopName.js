import React from 'react';
import {Input} from "antd";

const ShopName = () => {
    return (
        <div>
            <div className="page_title">
                <h2>Choose your shop name</h2>
                <p>Choose a memorable name that reflects your style.</p>
            </div>
            <div className="page_content">
                <div className="container_80">
                    <Input.Search
                        placeholder="Choose a Shop Name"
                        enterButton="Check Availability"
                        size="large"
                    />
                    <p id="message">Shop names must have 4–20 characters.</p>
                    <p>Your shop name will appear in your shop and next to each of your listings throughout
                        Etsy. After you open your shop, you can change your name once</p>
                </div>
            </div>
        </div>
    );
};

export default ShopName;