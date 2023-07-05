const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const jobRoute = require("./routes/job.route");
const bookMarkRoute = require("./routes/bookmark.route");
const messageRoute = require("./routes/message.route");
const chatRoute = require("./routes/chat.route");

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
app.use("/api", authRoute);
app.use("/api/users", userRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/bookmarks", bookMarkRoute);
app.use("/api/messages", messageRoute);
app.use("/api/chats", chatRoute);

const server = app.listen(process.env.PORT || 3002, () =>
  console.log(`Server is listen to port ${process.env.PORT} 🤷‍♂️🤷‍♂️ !`)
);

const io = require("socket.io")(server, {
  pingTimeOut: 60000,
  cors: {
    // localhost
    // origin: "http:localhost:3001",
    // hosted server
    origin: "https://jobfinder-backend-paradax.onrender.com/",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket ");
  socket.on("setup", (userId) => {
    socket.join(userId);
    
    socket.broadcast.emit("online-user", userId);
    console.log(userId);
  });

  socket.on("typing", (room) => {
    console.log("typing");
    console.log("room");
    socket.to(room).emit("typing", room);
  });

  socket.on("stop-typing", (room) => {
    console.log("stop-typing");
    console.log("room");
    socket.to(room).emit("stop-typing", room);
  });

  socket.on("join chat", (room) => {
    console.log("User Joined " + room);
    socket.join(room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    var room = chat._id;
    var sender = newMessageReceived.sender;

    if (!sender || sender._id) {
      console.log("sender not defined");
      return;
    }

    var senderId = sender._id;
    console.log(senderId + "message sender");
    const users = chat.users;

    if (!users) {
      console.log("Users not defined ");
      return;
    }

    socket.to(room).emit("message-received", newMessageReceived);
    socket.to(room).emit("message-sent", "new message sent");
  });

  socket.off("setup", () => {
    console.log("user offline");
    socket.leave(userId);
  });
});
