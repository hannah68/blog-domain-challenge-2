// Load .env file=============================
require('dotenv').config();

// import express and cors====================
const express = require("express");
const cors = require('cors');

// Set up express=============================
const app = express();
app.disable('x-powered-by');
app.use(cors());
// Tell express to use a JSON parser middleware
app.use(express.json());
// Tell express to use a URL Encoding middleware
app.use(express.urlencoded({ extended: true }));


// routes=====================================
const userRouter = require("./routers/user");

// use routes=================================
app.use("/user", userRouter);


// Set up a default "catch all" route to use when someone visits a route that I haven't built==================================
app.get('*', (req, res) => {
    res.json({ ok: true });
});

// Start our API server=======================
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});