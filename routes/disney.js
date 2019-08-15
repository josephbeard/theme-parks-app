const express = require("express");
const router = express.Router();

const Themeparks = require("themeparks");

const Disneyland = new Themeparks.Parks.DisneylandResortMagicKingdom();
const CaliforniaAdventure = new Themeparks.Parks.DisneylandResortCaliforniaAdventure();
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
 * @api {get} /opening-times Opening Times
 * @apiDescription Get park opening times.
 * @apiGroup Disneyland
 */
router.get("/opening-times", async (req, res) => {
  try {
    console.log("request recieved");
    const openingTimes = await Disneyland.GetOpeningTimes();
    console.log("opening times found");
    return res.json(openingTimes);
  } catch (error) {
    console.error(error);
    return res.status(500).send("error");
  }
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
