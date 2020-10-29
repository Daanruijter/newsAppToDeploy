const expressServer = require("express");
const router = expressServer.Router();
const fetchMethod = require("node-fetch");
const fs = require("fs");

router.post("/api", (req, res) => {
  const url = req.body.fetchUrl;

  //fetch the data from the NewsAPI based on the user query that comes from the front-end
  fetchMethod(
    url,

    {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      return res.json({ succes: false, err });
    });
});

//Update the xml sitemap
router.post("/updateXMLSitemap", (req, res) => {
  const XMLData =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    req.body.XMLDataAndEnvironMentData.urlSetToSend;

  // Write updated XML string to the sitemap
  if (req.body.XMLDataAndEnvironMentData.environmentData === "development") {
    fs.writeFile("./client/dist/sitemap.xml", XMLData, (err) => {
      if (err) {
        console.log(err);
        res.send(err);
        throw err;
      }
    });
  }

  // Write updated XML string to the sitemap
  if (req.body.XMLDataAndEnvironMentData.environmentData === "production") {
    fs.writeFile("./sitemap.xml", XMLData, (err) => {
      if (err) {
        console.log(err);
        res.send(err);
        throw err;
      }
      res.send("sitemap XML file updated");
    });
  }
});

module.exports = router;
