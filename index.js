const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

// Update the array to include the new URL
const allowedOrigins = ["http://localhost:3000", "https://www.enactusvitc.com/*"];

app.use(cors({ origin: allowedOrigins }));

// middlewares
app.use(express.json({ extended: false }));

// routes
app.get("/", (req, res) => res.send("API running"));

// route included
app.use("/payment", require("./payment"));

app.listen(port, () => console.log(`server started on port ${port}`));
