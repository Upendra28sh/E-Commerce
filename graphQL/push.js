const router = require("express").Router()
module.exports = router
const webpush = require("web-push")

webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY)
webpush.setVapidDetails(
  "mailto:your-email-address@example-domain.com",
  "BImBf1MZPoA5x-HrDlQoODpFY0mmshS9t_dGTLfHNBZNt8WsxcquRsYnr9J61Fu44MxKUQyaXUBdz9yJlzElVyM",
  "QSKojmLYRF_MAP_zWxMUckT3kk8faHak4wf4Jxqu0fk"
)

const testData = {
    title: "Testing",
    body: "It's a success!",
    icon: "/path/to/an/icon.png"
  }
  
  let subscription
  let pushIntervalID
  
  router.post("/register", (req, res, next) => {
    subscription = req.body
    console.log(subscription)
    res.sendStatus(201)
    pushIntervalID = setInterval(() => {
      // sendNotification can only take a string as it's second parameter
      webpush.sendNotification(subscription, JSON.stringify(testData))
        .catch(() => clearInterval(pushIntervalID))
    }, 30000)
  })
  
  router.delete("/unregister", (req, res, next) => {
    subscription = null
    clearInterval(pushIntervalID)
    res.sendStatus(200)
  })