// const express = require("express");
// const app = express();
// require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
// const bodyParser = require("body-parser");
// const cors = require("cors");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(cors());

// app.post("/payment", cors(), async (req, res) => {
//   let { amount, id } = req.body;
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount,
//       currency: "INR",
//       description: "Enactus VITC",
//       payment_method: id,
//       //   confirm: true,
//       //   confirmParams: { return_url: "http://localhost:3000/confirm" },
//     });

//     console.log("Payment", payment);
//     res.json({
//       message: "Payment successful",
//       success: true,
//     });
//   } catch (error) {
//     console.log("Error", error);
//     res.json({
//       message: "Payment failed",
//       success: false,
//     });
//   }
// });

// app.listen(process.env.PORT || 8000, () => {
//   console.log(`Server is listening on port ${process.env.PORT || 8000}`);
// });

const express = require("express");


const app = express();
const port = process.env.PORT || 8080;

const cors = require('cors');
app.use(cors());


// middlewares
app.use(express.json({ extended: false }));

// route included
app.use("/payment", require("./payment"));

app.listen(port, () => console.log(`server started on port ${port}`));
