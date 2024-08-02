// backend/server.js

const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
app.use(express.json()); // body parser (request body)

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/user", userRoutes);

app.use(notFound); // 위 라우터에 걸리지 않는 url은 여기 걸린다.
app.use(errorHandler); // 위에서부터 내려오는 에러들을 처리해주도록.

app.listen(PORT, () => {
  console.log("Server Started on PORT : ", PORT);
});
