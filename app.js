const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const download = require("image-downloader");

const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  var name;
  var name2;
  var explanation1;
  var explanation2;
  var explanation3;

  const nasa_url =
    "https://api.nasa.gov/planetary/apod?api_key=" +
    process.env.NASA_API_KEY +
    "&date=";

  // ITEM 1
  const year1 = Math.round(Math.random() * (2023 - 2010) + 2010);
  const month1 = Math.round(Math.random() * (12 - 1) + 1);
  const day1 = Math.round(Math.random() * (28 - 1) + 1);
  const date1 = year1 + "-" + month1 + "-" + day1;

  https.get(nasa_url + date1, function (response) {
    var chunks = [];

    response.on("data", function (chunk) {
      chunks.push(chunk);
    });

    response.on("end", function () {
      var body = Buffer.concat(chunks);
      const spaceData = JSON.parse(body);
      const imgURL = spaceData.hdurl;
      explanation1 = spaceData.explanation;
      name = spaceData.title;
      const dest = __dirname + "/public/images/image.jpg";

      const options = {
        url: imgURL,
        dest: dest,
      };

      download.image(options).catch((err) => console.error(err));
    });
  });

  // ITEM 2
  const year2 = Math.round(Math.random() * (2023 - 2015) + 2015);
  const month2 = Math.round(Math.random() * (12 - 1) + 1);
  const day2 = Math.round(Math.random() * (28 - 1) + 1);
  const date2 = year2 + "-" + month2 + "-" + day2;

  https.get(nasa_url + date2, function (response) {
    var chunks = [];

    response.on("data", function (chunk) {
      chunks.push(chunk);
    });

    response.on("end", function () {
      var body = Buffer.concat(chunks);
      const spaceData2 = JSON.parse(body);
      const imgURL2 = spaceData2.hdurl;
      explanation2 = spaceData2.explanation;
      name2 = spaceData2.title;
      const dest2 = __dirname + "/public/images/image2.jpg";

      const options = {
        url: imgURL2,
        dest: dest2,
      };

      download.image(options).catch((err) => console.error(err));
    });
  });

  // ITEM 3
  const year = Math.round(Math.random() * (2023 - 2015) + 2015);
  const month = Math.round(Math.random() * (12 - 1) + 1);
  const day = Math.round(Math.random() * (28 - 1) + 1);
  const date3 = year + "-" + month + "-" + day;

  https.get(nasa_url + date3, function (response) {
    var chunks = [];

    response.on("data", function (chunk) {
      chunks.push(chunk);
    });

    response.on("end", function () {
      var body = Buffer.concat(chunks);
      const spaceData3 = JSON.parse(body);
      const imgURL3 = spaceData3.hdurl;
      explanation3 = spaceData3.explanation;
      const name3 = spaceData3.title;
      const dest3 = __dirname + "/public/images/image3.jpg";

      const options = {
        url: imgURL3,
        dest: dest3,
      };

      download.image(options).catch((err) => console.error(err));

      res.render("home", {
        title: name,
        secTitle: name2,
        thirdTitle: name3,
        firstDesc: explanation1,
        secondDesc: explanation2,
        thirdDesc: explanation3,
      });
    });
  });
});

app.get("/signup.html", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

app.post("/signup.html", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const listId = process.env.LIST_ID;

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });

    res.sendFile(__dirname + "/success.html");
  }

  run().catch((e) => {
    console.log(e);
    res.sendFile(__dirname + "/failure.html");
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("server started"));

module.exports = app;
