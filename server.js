const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// Deployed app will access PORT variable. When ran locally, app will run on localhost/3000
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Mongoose connection. Deployed app will connect to MONGODB_URI. When ran locally, app will connect to budget mongodb database
// When successfully connected, a message will be displayed on the console log. Otherwise, an error will display
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log("Connected to Mongo database!");
})
.catch(err => {
  console.error("App starting error:", err.stack);
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});