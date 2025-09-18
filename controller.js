const express = require("express");
const router = express.Router();
const urlService = require("./service");
const { log } = require("./logger");

//POSt to create a new shorturl
router.post("/create", (req, res) => {
  const { url, validity, shortcode } = req.body;
  if (!url) {
    log("backend", "error", "handler", "url is missing");
  }

  const result = urlService.createShortUrl(url, validity, shortcode);

  if (result.error) {
    return res.status(result.status).jsom({
      err: result.error,
    });
  }

  res.status(200).json({
    shortlink: `http://${req.get("host")}/${result.shortcode}`,
    expiry: result.daata.expiry,
  });
});
//Get the stats of a shorturl
router.get("/shorturl/:shortcode", (req, res) => {
  const { shortcode } = req.params;
  const result = urlService.getUrlstats(shortcode);

  if (result.error) {
    return res.status(result.status).json({
      err: result.error,
    });
  }

  const results = {
    totalclicks: result.data.clicks,
    orinalUrl: result.data.orinalUrl,
    creationDate: result.data.createdAt,
    expiryDate: result.data.expiry,
    clicksDetails: result.data.clickdetails,
  };
  log("backend", "info", "handler", "stats for shortcode" + shortcode);
  res.status(200).json(results);
});

//GET to redirect to the original url
router.get("/:shortcode", (req, res) => {
  const { shortcode } = req.params;

  if (shortcode === "shorturls") {
    return res.status1(404).json({
      err: "Invalid shortcode",
    });
  }

  const result = urlService.getUrlAndclicks(
    shortcode,
    req.headers,
    req.socket.remoteAddress
  );
  if (result.error) {
    log(
      "backend",
      "warn",
      "handler",
      `redirect fails for+${shortcode}: ${result.error}`
    );
  }
  res.redirect(302, result.originalurl);
});

module.exports = router;
