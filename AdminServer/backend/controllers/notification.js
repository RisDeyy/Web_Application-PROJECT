const Notification = require("../models/User");

const notification={
    getAllNotification: async(req,res)=>{
        try {
            Notification.find({})
              .sort({ updatedAt: -1, createdAt: -1 })
              .exec((err, notifications) => {
                if (err) {
                  res.status(500).json({ error: "An error occurred." });
                } else {
                  const combinedTimeArray = notifications.map((notification) => {
                    const combinedTime = notification.updatedAt || notification.createdAt;
                    return { ...notification._doc, combinedTime };
                  });
          
                  const sortedNotifications = combinedTimeArray.sort((a, b) => {
                    return new Date(b.combinedTime) - new Date(a.combinedTime);
                  });
          
                  res.status(200).json(sortedNotifications);
                }
              });
          } catch (err) {
            res.status(500).json({ error: "An error occurred." });
          }
          
       
    },
};
module.exports = notification;
