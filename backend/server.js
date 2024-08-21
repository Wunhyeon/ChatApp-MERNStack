// backend/server.js

const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { protect } = require("./middleware/authMiddleware");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
app.use(express.json()); // body parser (request body)

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound); // 위 라우터에 걸리지 않는 url은 여기 걸린다.
app.use(errorHandler); // 위에서부터 내려오는 에러들을 처리해주도록.

const server = app.listen(PORT, () => {
  console.log("Server Started on PORT : ", PORT);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
  pingTimeOut: 60000,
});

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, socket.request.res || {}, next);
// io.use(wrap(protect));

io.on("connection", (socket) => {
  console.log("connected socketIo");

  const req = socket.request;
  console.log("req.user : ", req.user);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log("userData : ", userData);
    console.log("@@@ setup - userData._id : ", userData._id);

    socket.emit("connected one on one");
  });

  socket.on("join chat", (info) => {
    // socket.join(room);
    const [room, userId] = info;
    socket.join(info);
    console.log("User Joined room : ", room, " userId : ", userId);
    console.log("socket.rooms : ", socket.rooms);
  });

  socket.on("newMessage", (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    // console.log("newMessage - newMessageReceived : ", newMessageReceived);

    if (!chat.users) {
      console.log("chat.users not defined");
    }

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) {
        return;
      }
      console.log("after return. user.name : ", user.name);

      // io.to(user._id).emit("io-user-messageReceived", newMessageReceived);
      // io.to(chat._id).emit("io-chat-messageReceived", newMessageReceived);
      socket
        .to(user._id)
        .emit("socket-user-messageReceived", newMessageReceived);
      // socket
      //   .to(chat._id)
      //   .emit("socket-chat-messageReceived", newMessageReceived);
    });

    socket.broadcast
      .to(chat._id)
      .emit("socket-chat-messageReceived", newMessageReceived);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED - setup leave");
    socket.leave(userData._id);
  });

  socket.on("disconnect", (data) => {
    console.log("disconnect : ", socket.id);
    // console.log("userData : ", userData);
    console.log("data : ", data);
  });
});
