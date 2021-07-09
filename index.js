
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JBMjySA29ZGvQ2zTBEz2vMdLLq6un101Z1LDVylAFVqSqB8MXAGlpTj5sswCgKELTpAB3f7ER4IMJr2xnrvc3fG00XaoaRVOY"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "INR",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
const port = process.env.PORT || 6001;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})

