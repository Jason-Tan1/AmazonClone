require('dotenv').config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Securely using env variable

// App config
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.status(200).send("hello world"));

// Expose API to Firebase
exports.api = functions.https.onRequest(app);