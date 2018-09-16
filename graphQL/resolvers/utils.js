import Approval from './../models/approval';
import Feed from './../models/feed';
import Notification from '../models/notification';
import Seller from '../models/seller';
import crypto from 'crypto';
import config from "../config";
import qs from 'qs';

export function createApprovalRequest(approvalType, originId) {

    let approval = new Approval({
        approvalType,
        origin: originId,
        refString: approvalType,
        comment: ''
    });

    approval.save().then(data => {
        console.log(data);
        // TODO : Take a Action Like SMS or Email For New Approval Created
        // TODO : Create A Notification For Admin


    }).catch(err => {
        console.error(err);
        sendErrorReport("Unable To Correct Approval", {
            approvalType,
            originId
        });
    });

}

export function createFeedItem(feedType, originId, keyId, event) {

    let feed = new Feed({
        event: event,
        origin: originId,
        key: keyId,
        refString: feedType,
    });

    feed.save().then(data => {
        console.log(data);
        // TODO : Take a Action Like SMS or Email For New Approval Created
        // TODO : Create A Notification For Admin


    }).catch(err => {
        console.error(err);
        sendErrorReport("Unable To Create feed item", {
            feedType,
            originId,
            event
        });
    });

}

// Not Tested
export function createNotificationProduct(data) {
    console.log(data);
    Seller.findOne({
        _id: data.seller
    }).then(
        foundSeller => {
            Notification.create({
                text: `${foundSeller.name} added a product - ${data.name}`,
                action: 'www.google.co.in',
                image: data.image,
                to: foundSeller.followers
            }).then(
                data => console.log(data)
            ).catch(
                err => console.log(err)
            );
        }
    );
}

// Tested
export function createNotificationSellerpost(data) {
    // console.log(data);
    Seller.findOne({
        _id: data.seller.id
    }).then(
        foundSeller => {
            Notification.create({
                text: `${data.seller.name} added a post`,
                action: 'www.google.co.in',
                image: data.image,
                to: foundSeller.followers
            }).then(
                data => console.log(data)
            );
        }
    );


}

export function createdNotificationFollow(followedBy, following) {
    console.log(followedBy, following);

    Notification.create({
        to: following.id,
        text: `${followedBy.name} followed you`,
        image: followedBy.image,
        action: `/user/${followedBy.username}`
    }).then(
        data => console.log(data)
    );
}

// TODO : Send a MAIL TO DEV TEAM
export function sendErrorReport(message, data) {
    console.log("New Error Reported");
}

export function generateEncRequest(order) {
    console.log(order);
    let body = {
        merchant_id: config.merchant_id,
        order_id: order.id,
        currency: 'INR',
        amount: order.total,
        redirect_url: config.redirect_url,
        cancel_url: config.cancel_url,
        language: 'en',
        billing_name: order.user.name,
        billing_address: order.shipping.address.address + ", " + order.shipping.address.street,
        billing_city: order.shipping.address.city,
        billing_state: order.shipping.address.state,
        billing_zip: order.shipping.address.zipcode,
        billing_country: "India",

    };
    console.log(body.toString());
    let encRequest = encrypt(body);
    return encRequest;
}


function encrypt(body) {
    let plainText = qs.stringify(body);
    var m = crypto.createHash('md5');
    m.update(config.working_key);
    var key = m.digest();
    var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    var encoded = cipher.update(plainText, 'utf8', 'hex');
    encoded += cipher.final('hex');
    return encoded;
};


function decrpyt(encText, workingKey) {
    var m = crypto.createHash('md5');

    m.update(workingKey);
    var key = m.digest();
    var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decoded = decipher.update(encText, 'hex', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
};

