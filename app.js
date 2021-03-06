
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const download = require('image-downloader');

const app = express();

app.set('view engine' , 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  var name;
  var name2;
  var explanation1;
  var explanation2;
  var explanation3;

  //*********************ITEM1************************
  const year1 = Math.round(Math.random() * (2020 - 2010) + 2010);
  const month1 = Math.round(Math.random() * (12 - 1) + 1);
  const day1 = Math.round(Math.random() * (28 - 1) + 1);
  const date1 = year1 + "-" + month1 + "-" + day1;

  const url = "https://api.nasa.gov/planetary/apod?api_key=YXeXXhW1ABSODHZgXCt5u4kTm4kZubn6bFejnvn2oyn&date=" + date1;

  https.get(url, function(response){
    response.on("data", function(data){
      const spaceData = JSON.parse(data);
      const imgURL = spaceData.hdurl;
      explanation1 = spaceData.explanation;
      name = spaceData.title;
      const dest = __dirname + "/public/images/image.jpg";

      const options = {
        url: imgURL,
        dest: dest
      }

      download.image(options)
        .catch((err) => console.error(err));
    })
  })
  //**************************************************************

  //*********************ITEM2************************
  const year2 = Math.round(Math.random() * (2020 - 2015) + 2015);
  const month2 = Math.round(Math.random() * (12 - 1) + 1);
  const day2 = Math.round(Math.random() * (28 - 1) + 1);
  const date2 = year2 + "-" + month2 + "-" + day2;

  const url2 = "https://api.nasa.gov/planetary/apod?api_key=YXQEReXXhW1ODHZgXCt5u4kTm4kZubn6bFejnvn2oyn&date=" + date2;

  https.get(url2, function(response){
    response.on("data", function(data){
      const spaceData2 = JSON.parse(data);
      const imgURL2 = spaceData2.hdurl;
      explanation2 = spaceData2.explanation;
      name2 = spaceData2.title;
      const dest2 = __dirname + "/public/images/image2.jpg";

      const options = {
        url: imgURL2,
        dest: dest2
      }

      download.image(options)
        .catch((err) => console.error(err))
    })
  })

  //**************************************************************

  //*********************ITEM3************************
  const year = Math.round(Math.random() * (2020 - 2015) + 2015);
  const month = Math.round(Math.random() * (12 - 1) + 1);
  const day = Math.round(Math.random() * (28 - 1) + 1);
  const date = year + "-" + month + "-" + day;

  const url3 = "https://api.nasa.gov/planetary/apod?api_key=YXeXXhW1ODHZWEFgXCt5u4kTm4kZubn6bFejnvn2oyn&date=" + date;

  https.get(url3, function(response){
    response.on("data", function(data){
      const spaceData3 = JSON.parse(data);
      const imgURL3 = spaceData3.hdurl;
      explanation3 = spaceData3.explanation;
      const name3 = spaceData3.title;
      const dest3 = __dirname + "/public/images/image3.jpg";

      const options = {
        url: imgURL3,
        dest: dest3
      }

      download.image(options)
        .catch((err) => console.error(err))

      res.render("home", {title : name , secTitle: name2 , thirdTitle: name3, firstDesc: explanation1, secondDesc: explanation2, thirdDesc: explanation3});

    })
  })
  //**************************************************************

});

app.get("/signup.html", function(req, res){
  res.sendFile( __dirname + "/signup.html");
});

mailchimp.setConfig({
 apiKey: "e58796e6c530e4fbd3fdd986ad5fb748-us7",
 server: "us7"
});

app.post("/signup.html", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const listId = "7833ad8b99";

  const subscribingUser = {
   firstName: firstName,
   lastName: lastName,
   email: email
  };

  async function run() {
   const response = await mailchimp.lists.addListMember(listId, {
     email_address: subscribingUser.email,
     status: "subscribed",
     merge_fields: {
     FNAME: subscribingUser.firstName,
     LNAME: subscribingUser.lastName
     }
    });

  res.sendFile(__dirname + "/success.html");
};

  run().catch(e => res.sendFile(__dirname + "/failure.html"));
});


app.listen(3000);
