import express from "express";
import userRoutes from "./user/routes/userRoutes.js";
import { connection } from "./services/connection.js";
import blogRouter from "./Blogs/routes/blogRoutes.js";


const app = express();
app.use(express.json())
connection() //mongodb connection 

app.use("/", userRoutes);
app.use("/blogs",blogRouter)
app.listen(4000, () => {
  console.log("server is started on 4000");
});
