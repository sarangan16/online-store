const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// manually set cors headers to make sure it works
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title || item.name || "SARANS Product",
        images: item.thumbnail ? [item.thumbnail] : [],
      },
      unit_amount: Math.round((parseFloat(item.price) || 12.99) * 100),
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      // collect customer name and email
      billing_address_collection: "required",
      // collect shipping address
      shipping_address_collection: {
        allowed_countries: ["US", "GB", "DE", "FR", "AU", "CA", "LK"],
      },
      // collect phone number
      phone_number_collection: {
        enabled: true,
      },
      success_url: "https://kaufde.vercel.app?payment=success",
      cancel_url: "https://kaufde.vercel.app?payment=cancelled",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
