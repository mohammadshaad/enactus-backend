const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

// Update the array to include the new URL
const allowedOrigins = ["http://localhost:3000", "https://www.enactusvitc.com"];

// Function to check if the origin is allowed
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || origin.startsWith("https://enactusvitc.com/success")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Handling preflight requests
app.options("*", cors());

// middlewares
app.use(express.json()); // removed { extended: false } as it is not needed

// routes
app.get("/", (req, res) => res.send("API running"));

// route included
app.use("/payment", require("./payment"));

app.listen(port, () => console.log(`server started on port ${port}`));
