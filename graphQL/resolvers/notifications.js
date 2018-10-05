const Notification = require('../models/notification');
const User = require('../models/user');

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
        getNotifsByUser: (parent, args, {
            user
        }, info) => {
            return Notification
                .find({
                    "to": user.id
                })
                .populate('to')
                .populate('readBy')
                .sort('-created_at')
                .limit(10)
                .exec()
                .then(
                    data => data
                )
        }
    },
    Mutation: {
        notificationRead: (parent, {
            id
        }, {
            user
        }, info) => {
            return Notification
                .findOne({
                    _id: id
                })
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
        },
        makeChatNotify: (parent, {
            to
        }, {
            user
        }, info) => {
            return User.findOne({
                username:to
            }).then(users=>{
                
                Notification.findOne({
                    "text": {"$regex":user.username},
                    "to": users.id,
                    "action": '/chat'
                }).exec().then(
                    foundNotif => {
                        if (foundNotif == null) {
                            var temp = new Notification({
                                "text": "1 unread chat from "+user.username,
                                "to": users.id,
                                "action": '/chat',
                                "image":user.image
                            })
                            temp.save();
                        }
                        else
                        {
                            var noOfChat = parseInt(foundNotif.text,10);
                            noOfChat++;
                            foundNotif.text = noOfChat+" unread chat from "+user.username;
                            foundNotif.save();
                        }
                    }
                )
            })
        }
    }
}