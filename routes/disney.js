const express = require('express')
const router = express.Router()

const Themeparks = require("themeparks")
Themeparks.Settings.CacheWaitTimesLength = 60
Themeparks.Settings.DefaultCacheLength = 60

const DisneylandResortMagicKingdom = new Themeparks.Parks.DisneylandResortMagicKingdom()

/**
 * @api {get} /wait-times Wait Times
 * @apiDescription Get ride wait times.
 * @apiGroup Disneyland
 */
router.get('/wait-times', async (req, res) => {
  console.log('request recieved')
  DisneylandResortMagicKingdom.GetWaitTimes().then(rideTimes => {
    console.log('ride times found')
     return res.json(rideTimes)
   }).catch((error) => {
     console.error(error);
     return res.status(500).send('error')
   })
})

module.exports = router
