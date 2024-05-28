const errorMiddleware = require("./middlewares/errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

//routes
const user = require("./routes/user");
const categories = require("./routes/category");
const brands = require("./routes/brand");
const products = require("./routes/product");

var cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use("/api/v1", user);
app.use("/api/v1", categories);
app.use("/api/v1", brands);
app.use("/api/v1", products);

app.use(errorMiddleware);

module.exports = app;
