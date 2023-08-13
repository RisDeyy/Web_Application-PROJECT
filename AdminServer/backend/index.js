const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const notification = require("./routes/notification")
const socketIO = require('socket.io');
const Notification = require("./models/User")
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("CONNECTED TO MONGO DB");
});
app.use(cors());
app.use(cookieParser());
app.use(express.json());
const server=app.listen(8000, () => {
  console.log("Server is running");
});

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');
  const session = mongoose.startSession();
  // Theo dõi thay đổi trong cơ sở dữ liệu MongoDB
  const changeStream = Notification.watch([], { session });

  changeStream.on('change', (change) => {
    if (change.operationType === 'insert' || change.operationType === 'update') {
      const extractedData = {
        title: change.fullDocument.username,
        content: change.fullDocument.email,
        updatedAt: change.fullDocument.updatedAt || change.fullDocument.createdAt
      };
  
      // Gửi thông báo tới client khi có thay đổi trong cơ sở dữ liệu
      console.log(extractedData);
      io.emit('notification', extractedData);
    }
  });

  // Ngắt kết nối Socket.IO
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    session.endSession();
    changeStream.close();
  });
});
//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/notification",notification)

