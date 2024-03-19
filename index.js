// index.js

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// Import routes
const loginRoutes = require("./routes/auth.routes");
const problemRoutes = require("./routes/problem.routes");

// Use routes
app.use("/login", loginRoutes);
app.use("/problem", problemRoutes);

// Starting server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
