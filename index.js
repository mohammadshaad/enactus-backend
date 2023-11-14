
const express = require("express");


const app = express();
const port = process.env.PORT || 8080;

const cors = require('cors');
app.use(cors());


// middlewares
app.use(express.json({ extended: false }));

// routes
app.get("/", (req, res) => res.send("API running"));


// route included
app.use("/payment", require("./payment"));

app.listen(port, () => console.log(`server started on port ${port}`));
