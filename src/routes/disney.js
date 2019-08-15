module.exports = ({ express }) => {
  const routes = express.Router();
  const Themeparks = require("themeparks");
  Themeparks.Settings.DefaultCacheLength = 5;
  Themeparks.Settings.CacheOpeningTimesLength = 5;
  const DisneyWorldMagicKingdom = new Themeparks.Parks.DisneyWorldMagicKingdom();

  /**
   * @api {get} /wait-times Wait Times
   * @apiDescription Get ride wait times.
   * @apiGroup Dsiney
   */
  routes.get("/wait-times", async (req, res) => {
    try {
      console.log("requesting");
      console.log({ DisneyWorldMagicKingdom });
      console.log("-- get wait time --");
      console.log(DisneyWorldMagicKingdom.GetWaitTimes);
      const rideTimes = await DisneyWorldMagicKingdom.GetWaitTimes();
      console.log({ rideTimes });
      return res.json(rideTimes);
    } catch (e) {
      console.error(e);
      return res.send("error");
    }
  });

  return routes;
};
