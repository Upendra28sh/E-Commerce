import Approval from './../models/approval';
import Feed from './../models/feed';
import Notification from '../models/notification';
import Seller from '../models/seller';

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