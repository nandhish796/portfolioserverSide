const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/hey", (req, res) => {
  console.log("hey");   
});
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "Please fill all fields" });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:"portfolio1702@gmail.com",
        pass:"zqrp wtjq ugmn suwl",
      },
    });

    let mailOptions = {
      from: email,
      to: "portfolio1702@gmail.com",
      subject: `Contact Form Submission from ${name}`,
      text: message,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
