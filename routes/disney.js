const express = require("express");
const router = express.Router();

const Themeparks = require("themeparks");
console.log(Themeparks.Settings);
Themeparks.Settings.CacheWaitTimesLength = 1;
Themeparks.Settings.DefaultCacheLength = 1;
console.log(Themeparks.Settings);

const DisneylandResortMagicKingdom = new Themeparks.Parks.DisneylandResortMagicKingdom();

/**
 * @api {get} /test test
 * @apiDescription test
 * @apiGroup Disneyland
 */
router.get("/test", (req, res) => {
  console.log("request recieved");
  return res.send("working");
});

/**
 * @api {get} /wait-times Wait Times
 * @apiDescription Get ride wait times.
 * @apiGroup Disneyland
 */
router.get("/wait-times", (req, res) => {
  console.log("request recieved");
  DisneylandResortMagicKingdom.GetWaitTimes()
    .then(rideTimes => {
      console.log("ride times found");
      return res.json(rideTimes);
    })
    .catch(error => {
      console.error(error);
      return res.status(500).send("error");
    });
});

module.exports = router;
