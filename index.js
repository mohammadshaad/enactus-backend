// const express = require("express");
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 8080;

// // Update the array to include the new URL
// const allowedOrigins = ["http://localhost:3000", "https://www.enactusvitc.com"];

// // Function to check if the origin is allowed
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin) || origin.startsWith("https://enactusvitc.com")) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));

// // Handling preflight requests
// app.options("*", cors());

// // middlewares
// app.use(express.json()); // removed { extended: false } as it is not needed

// // routes
// app.get("/", (req, res) => res.send("API running"));

// // route included
// app.use("/payment", require("./payment"));

// app.listen(port, () => console.log(`server started on port ${port}`));
 

// ---------------------------------------------------------------------------------------------

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://www.enactusvitc.com'); // Specify the allowed origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Specify the allowed HTTP methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Specify the allowed headers
  res.header('Access-Control-Allow-Credentials', true); // Allow sending cookies from the origin
  res.header('Access-Control-Max-Age', '86400'); // Cache the preflight request for 24 hours

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

app.use("/payment", require("./payment"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
