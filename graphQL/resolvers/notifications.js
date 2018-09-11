const Notification = require('../models/notification');

module.exports = {
    Query: {
        allNotifs: (parent, args, context, info) => {
            return Notification
                .find()
                .populate('to')
                .populate('readBy')
                .exec()
                .then(
                    data => data
                )
        },
        getNotifsByUser: (parent, args, {user}, info) => {
            return Notification
                .find({
                    "to": user.id
                })
                .populate('to')
                .populate('readBy')
                .exec()
                .then(
                    data => data
                )
        }
    }
}