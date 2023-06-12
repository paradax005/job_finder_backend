const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Here we go !👌👌 " });
});

app.listen(port, () => console.log(`Server is listen to port ${port} 🤷‍♂️🤷‍♂️ !`));
