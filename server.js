const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://beenish:beenish@cluster0-l7qiy.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
//mongoose.set("useUnifiedTopology", true);
mongoose.connection
  .once("open", () => {
    console.log("connected to MongoDB");
  })
  .on("error", (error) => {
    console.log("not connected" + error);
  });
// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
