import express from "express"
import { addBlog, deleteBlog, getAllPosts, getBlog, updateBlog } from "../controllers/blogController.js"
const blogRouter = express.Router()


blogRouter. get("/",getAllPosts)
blogRouter. post("/addblog",addBlog)
blogRouter. put("/update/:id",updateBlog)
blogRouter. get("/get/:id",getBlog)
blogRouter. delete("/delete/:id",deleteBlog)

export default blogRouter