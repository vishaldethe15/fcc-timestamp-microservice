// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  const timestamp = req.params.date;

  if (!isNaN(Number(timestamp)) && timestamp.length == 13) {
    return res.json({
      unix: parseInt(timestamp),
      utc: new Date(Number(timestamp)).toUTCString(),
    });
  }

  if (new Date(timestamp).toUTCString() !== "Invalid Date") {
    return res.json({
      unix: new Date(timestamp).getTime(),
      utc: new Date(timestamp).toUTCString(),
    });
  }

  res.json({ error: "Invalid Date" });
});

// listen for requests :)
const listener = app.listen(3300, function () {
  console.log("app is listening on port " + listener.address().port);
});
