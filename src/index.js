try {
  const express = require("express");
  const disney = require("./routes/disney");

  const app = express();

  // Serving static files from "public" folder
  app.use(express.static("public"));

  // Set req.ip to use real public ip in Google app engine
  app.set("trust proxy", true);

  // headers
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,UPDATE,PATCH,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Content-Type, Authorization, Content-Length, X-Requested-With, X-Access-Token"
    );
    next();
  });

  app.get("/", (req, res) => {
    return res.json("Unnoficial Disneyland planning API");
  });

  // routes that don't require x-access-token
  app.use("/disney", disney({ express }));

  app.listen(8080, "0.0.0.0");
  console.log("App is running on port " + 8080);
} catch (error) {
  console.log(error);
  process.exit(1);
}
