module.exports = ({ express }) => {
  const routes = express.Router();
  const Themeparks = require("themeparks");
  Themeparks.Settings.DefaultCacheLength = 5;
  Themeparks.Settings.CacheOpeningTimesLength = 5;
  const Disneyland = new Themeparks.Parks.DisneylandResortMagicKingdom();

  /**
   * @api {get} /wait-times Wait Times
   * @apiDescription Get ride wait times.
   * @apiGroup Dsiney
   */
  routes.get("/wait-times", async (req, res) => {
    try {
      console.log("requesting");
      console.log({ Disneyland });
      console.log("-- get wait time --");
      console.log(Disneyland.GetWaitTimes);
      const rideTimes = await Disneyland.GetWaitTimes();
      console.log({ rideTimes });
      return res.json(rideTimes);
    } catch (e) {
      console.error(e);
      return res.send("error");
    }
  });

  return routes;
};
