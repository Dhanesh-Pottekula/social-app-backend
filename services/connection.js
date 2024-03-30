import mongoose from "mongoose";

export function connection() {
    mongoose
      .connect("mongodb://localhost:27017/socialMedia")
      .then(() => {
        console.log("mongodb connected");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  connection();
  