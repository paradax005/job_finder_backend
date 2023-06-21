const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const authRoute = require("./routes/auth.route");



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Here we go !👌👌 " });
});

app.use(express.json());
app.use('/api',authRoute);

app.listen(process.env.PORT || 3002, () =>
  console.log(`Server is listen to port ${process.env.PORT} 🤷‍♂️🤷‍♂️ !`)
);
