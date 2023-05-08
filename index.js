const mongoose = require("mongoose");
  mongoose.connect("mongodb://127.0.0.1:27017/members");
  // mongoose.set("strictQuery", true);
  

  const express = require("express");
  const app = express();


  //for user routes
  const userRouter = require("./router/userRouter");
  app.use("/", userRouter);

  //for admin routes
  const adminRouter = require("./router/adminRouter");
  app.use("/admin", adminRouter);

  app.listen(5000,() => {
    console.log("Server running...");
  });
