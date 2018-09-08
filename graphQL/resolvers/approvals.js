import Approval from '../models/approval';
import Product from '../models/product';

module.exports = {
    Query: {
        getProductApproval: (parent, args, context, info) => {
            return Approval.find({"approvalType": "Product", "reviewed": false}).populate({
                path: 'origin',
                populate: {
                    path: 'seller'
                }
            }).exec().then(
                foundApproval => foundApproval
            )
        },
        getSellerApproval: (parent, args, context, info) => {
            return Approval.find({"approvalType": "Seller", "reviewed": false}).populate('origin').exec().then(
                foundApproval => foundApproval
            )
        }
    },
    Mutation: {
        handleApproval: (parent, {input}, context, info) => {
            let {id,comment,approved} = input;
            return Approval.findOneAndUpdate(
                {_id: id},
                {
                    $set: {
                        comment: comment,
                        approved: approved,
                        reviewed: true
                    }
                },
                {new: true}
            ).then(
                updatedApproval => {
                    console.log(updatedApproval);
                    Product.findOne({_id: updatedApproval.origin}).exec().then(
                        foundProduct => {
                            foundProduct.approval.approved = updatedApproval.approved;
                            foundProduct.approval.comment = updatedApproval.comment;
                            foundProduct.save();
                        }
                    )
                    return !!updatedApproval
                }
            )
        }
    }
}