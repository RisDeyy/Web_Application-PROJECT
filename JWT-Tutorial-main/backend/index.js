const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const product = require("./routes/product");
const notification = require("./routes/notification")
const category = require("./routes/category")
const socketIO = require('socket.io');
const bodyParser = require("body-parser")
const Notification = require("./models/notification.model")
const Checkout = require("./models/checkout.model")
const user = require("./models/user.model");
const morgan = require('morgan');

dotenv.config();

mongoose.connect("mongodb+srv://vuong:vuong19022001@cluster0.o6he2.mongodb.net/organi_shop?retryWrites=true&w=majority", () => {
  console.log("CONNECTED TO MONGO DB");
});
app.use(morgan('common'));
app.use(bodyParser.json({limit:"50mb"}))
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
  
  
  const changeStreamOrder = Checkout.watch();

  changeStreamOrder.on('change', async (change) => {
    if (change.operationType === 'insert') {
      try {
        const userRecord = await user.findOne({ name: change.fullDocument.email });

        const customerName = userRecord ? userRecord.name : change.fullDocument.numberPhone;

        const newNoti = new Notification({
          title: 'Đặt hàng',
          content: `Khách hàng ${customerName} đã đặt hàng`,
        });

        await newNoti.save();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });


  const changeStream = Notification.watch();

  changeStream.on('change', (change) => {
    if (change.operationType === 'insert' || change.operationType === 'update') {
      const extractedData = {
        id : change._id._data,
        title: change.fullDocument.username,
        content: change.fullDocument.email,
        updatedAt: change.fullDocument.updatedAt || change.fullDocument.createdAt,
      };

      console.log(extractedData);
      io.emit('notification', extractedData); 
    }
  });

  // Ngắt kết nối Socket.IO
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    
    changeStream.close();
    changeStreamOrder.close();
  });
});


//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/navbar",notification);
app.use("/menu",product);
app.use("/menu",category);

