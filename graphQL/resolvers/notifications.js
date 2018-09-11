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
    },
    Mutation: {
        notificationRead: (parent, {id}, {user}, info) => {
            return Notification
                .findOne({_id: id})
                .exec()
                .then(
                    foundNotif => {
                        if (!foundNotif.readBy.includes(user.id)) {
                            foundNotif.readBy.push(user.id);
                            foundNotif.save();
                        }
                        return foundNotif;
                    }
                )
        }
    }
}