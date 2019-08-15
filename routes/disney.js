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
router.get("/wait-times", async (req, res) => {
  try {
    console.log("request recieved");
    const disneylandTimes = await Disneyland.GetWaitTimes();
    const caTimes = await CaliforniaAdventure.GetWaitTimes();
    console.log("ride times found");
    const allTimes = disneylandTimes.concat(caTimes);
    return res.json(allTimes);
  } catch (error) {
    console.error(error);
    return res.status(500).send("error");
  }
});

module.exports = router;
