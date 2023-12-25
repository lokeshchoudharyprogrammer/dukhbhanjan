
const Razorpay = require("razorpay");
const crypto = require("crypto");
var nodemailer = require('nodemailer');

const PaymentRouter = require("express").Router();
const razorpay = new Razorpay({
  key_id: "rzp_test_FZa7FJ6Bglhj8Y", // Replace with your actual key
  key_secret: "oOx40LBFhDdweDdbBHa4hLis", // Replace with your actual secret
}); 

PaymentRouter.post("/orders", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

PaymentRouter.post("/verify", async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mukeshd4797@gmail.com',
      pass: 'pgwotikfugwbrgvt'
    }
  });
 
  var mailOptions = {
    from: 'mukeshd4797@gmail.com',
    to: 'dasriyamukesh87@gmail.com',
    subject: 'Order by Dukhbhanjan ',
    text: `Hi Mukesh, thank you for your Order in dukhbhanjan.
            I will donate 50$ for this course. Please send me payment options.`
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });



  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac("sha256", razorpay.key_secret)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully", state: true });
    } else {
      console.error("Invalid signature");
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});


module.exports = { PaymentRouter };