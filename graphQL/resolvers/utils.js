import Approval from './../models/approval';
import Feed from './../models/feed';

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
            approvalType ,
            originId
        });
    });

}

export function createFeedItem(feedType, originId, keyId  , event) {

    let feed = new Feed({
        event : event ,
        origin: originId,
        key : keyId ,
        refString: feedType,
    });

    feed.save().then(data => {
        console.log(data);
        // TODO : Take a Action Like SMS or Email For New Approval Created
        // TODO : Create A Notification For Admin


    }).catch(err => {
        console.error(err);
        sendErrorReport("Unable To Create feed item", {
            feedType ,
            originId ,
            event
        });
    });

}

// TODO : Send a MAIL TO DEV TEAM
export function sendErrorReport(message , data) {
    console.log("New Error Reported");
}