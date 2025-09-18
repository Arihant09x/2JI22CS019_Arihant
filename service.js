const { log } = require("./logger");
const urlDB = new Map(); // In memory database

//this fucntion is used to genearte a ShortId
function generateShortId() {
  return Math.random() / toString(36).substring(2, 7); //generate a random number between 0 and 10^7
}

function createShortUrl(url, validity, customShortcode) {
  let finalShortUrl = customShortcode;
  if (finalShortUrl.lenght > 0) {
    if (urlDB.has(finalShortUrl)) {
      log(
        "backend",
        "warn",
        "service",
        `shorturl is already taken: ${finalShortUrl}`
      );
      return { error: "shorturl is already taken", status: 409 };
    }
  } else {
    finalShortUrl = generateShortId();
    while (urlDB.has(finalShortUrl)) {
      finalShortUrl = generateShortId(); //generate a new shortcode if the shortcode is already taken
    }
  }
  const validityMin = validity || 30; //default it is 30 minutes
  const expiryDate = new Date(Date.now() + validityMin * 60 * 1000); //expiry the date after validity min

  const urldata = {
    originalurl: url,
    createdAt: new Date().toISOString(), //current date
    expiry: expiryDate.toISOString(), //expiry date
    clicks: 0,
    clickdetails: [],
  };
  urlDB.set(finalShortUrl, urldata);
  log(
    "bakcend",
    "info",
    "serive",
    "created new urldata for " + finalShortUrl + "for URL:" + url
  );
  return { shortcode: finalShortUrl, daata: urldata };
}
function getUrlAndclicks(shortcode, reqHeaders, remoteAddress) {
  const urldata = urlDB.get(shortcode);

  if (!urldata) {
    return { error: "shortcode not found", status: 404 };
  }
  if (new Date() > new Date(urldata.expiry)) {
    urlDB.delete(shortcode);
    log(
      "backend",
      "warn",
      "service",
      "urldata for shortcode " + shortcode + "has expired"
    );
    return {
      error: "urldata for shortcode" + shortcode + "has expired",
      status: 404,
    };
  }

  urldata.clicks++;
  urldata.clickdetails.push({
    timestamp: new Date().toISOString(),
    source: reqHeaders["referer"] || "direct",
    location: reqHeaders["x-forwarded-for"] || remoteAddress,
  });
  return { originalurl: urldata.originalurl };
}

function getUrlstats(shortcode) {
  const urldata = urlDB.get(shortcode);
  if (!urldata) {
    return { errorL: "shortcode not found", status: 404 };
  }
  return { data: urldata };
}

module.exports = {
  createShortUrl,
  getUrlAndclicks,
  getUrlstats,
};
