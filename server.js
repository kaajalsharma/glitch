// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
//app.get("/", function(request, response) {
  //response.sendFile(__dirname + "index.html");
//});











//const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const PORT = process.env.PORT;

// instantiate an express app
//const app = express();
// cors
app.use(cors({ origin: "*" }));

app.get("/public/contactus.html", function(req, res) {
  res.sendFile(__dirname + "/public/contactus.html");
});

app.get("/public/contactus.html", express.static(process.cwd() + "/public/contactus.html")); //make public static

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "krosskonnection.autoform@gmail.com",
    pass: "deeplearning",
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    const mail = {
      sender: `${data.name} <${data.email}>`,
      to: "krosskonnection.auslan@gmail.com", // receiver email,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };
    console.log(res);
    
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
        //res.send("Success");
      }
    });
  });
});

//Index page (static HTML)
app.route("/").get(function (req, res) {
res.sendFile(process.cwd() + "/public/contactus.html");
  //res.redirect("/success");
//res.send("Success");
});


// http://expressjs.com/en/starter/basic-routing.html
//app.get("/", function(req, res) {
 // res.sendFile(__dirname + "contactus.html");
  //res.sendFile(__dirname + "public/contactus.html");
 // console.log(res.sendFile);
//});


/*************************************************/
// Express server listening...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
