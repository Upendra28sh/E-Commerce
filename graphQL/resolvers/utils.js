import Approval from './../models/approval';


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

// TODO : Send a MAIL TO DEV TEAM
export function sendErrorReport(message , data) {
    console.log("New Error Reported");
}