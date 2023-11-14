const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

// Allow requests from specified origins
const corsOptions = {
  origin: ["http://localhost:3000", "https://www.enactusvitc.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// middlewares
app.use(express.json({ extended: false }));

// routes
app.get("/", (req, res) => res.send("API running"));

// route included
app.use("/payment", require("./payment"));

app.listen(port, () => console.log(`server started on port ${port}`));
