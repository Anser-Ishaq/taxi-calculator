const express = require("express");
const app = express();
const port = process.env.PORT || 9001;
const nodemailer = require("nodemailer");
const cors = require("cors");
var bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
  res.send("hello");
});

app.post("/adminemail", async (req, res) => {
  const {
    email,
    name,
    mobile,
    address,
    country,
    code,
    city,
    pessenger,
    luggage,
    pickupDate,
    pickupTime,
    totalPrice,
    selectedOrigin,
    selectedDestination,
  } = req.body;
  let config = {
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: process.env.Email_Test,
      pass: process.env.Security_Key,
    },
  };

  const transporter = nodemailer.createTransport(config);
  try {
    const info = await transporter.sendMail({
      from: process.env.Email_Test,
      to: process.env.Admin_Email,
      subject: "User Confirmation",
      text: "New User here",
      html: `<b>
       <p>user pessenger ${pessenger}</p>
       <p>user luggage ${luggage}</p>
       <p>user pickupDate ${pickupDate}</p>
       <p>user pickupTime ${pickupTime}</p>
       <p>user totalPrice ${totalPrice}</p>
       <p>user selectedOrigin ${selectedOrigin}</p>
       <p>user selectedDestination ${selectedDestination}</p>
       <p>user email ${email}</p>
       <p>user name ${name}</p>
       <p>user mobile ${mobile}</p>
       <p>user address ${address}</p>
       <p>user country ${country}</p>
       <p>user city ${city}</p>
       <p>user code ${code}</p>
      </b> `,
    });
    res.status(200).json({
      msg: "u have received email",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to send email",
    });
  }
});

app.post("/useremail", async (req, res) => {
  const { email, name, totalPrice } = req.body;
  let config = {
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: process.env.Email_Test,
      pass: process.env.Security_Key,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const info = await transporter.sendMail({
    from: process.env.Email_Test,
    to: email,
    subject: "Hello ✔",
    text: "Hello world? for testing",
    html: `"<b>HEY ${name}, thanks for booking. Your total amount is ${totalPrice}. You will receive call soon for confirmation. </b>"`,
  });
  if (info) {
    res.status(200).json({
      msg: "u have received email",
    });
  }
});

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});
