import Approval from '../models/approval';
import Product from '../models/product';

module.exports = {
    Query: {
        getProductApproval: (parent, args, context, info) => {
            return Approval.find({"approvalType": "Product"}).populate({
                path: 'origin',
                populate: {
                    path: 'seller'
                }
            }).exec().then(
                foundApproval => foundApproval
            )
        },
        getSellerApproval: (parent, args, context, info) => {
            return Approval.find({"approvalType": "Seller"}).populate('origin').exec().then(
                foundApproval => foundApproval
            )
        }
    }
}