import mongoose from "mongoose";
import { userModal } from "../../user/modals/userSchema.js";
import { blogModal } from "../modals/BlogModal.js";

export const getAllPosts = async (req, res) => {
  let blogs;
  try {
    blogs = await blogModal.find();
  } catch (error) {
    return res.json({ error });
  }
  if (!blogs) {
    return res.json({ message: "no blogs found " });
  }
  return res.status(200).json({ message: "get all posts success", blogs });
};

export const addBlog = async (req, res) => {
  const { title, discription, user } = req.body;
  let existingUser;
  try {
    existingUser = await userModal.findById(user);
  } catch (error) {
    return res.json({ error });
  }

  if (!existingUser) {
    return res.json({ message: "user not found " }).status(404);
  }

  const newBlog = new blogModal({
    title,
    discription,
    user,
  });
  try {
    await newBlog.save();
    existingUser.blogs.push(newBlog);
    await existingUser.save();
  } catch (error) {
    return res.json({ error });
  }
  return res
    .status(201)
    .json({ message: "post created successfully ", newBlog });
};

export const updateBlog = async (req, res) => {
  const { title, discription } = req.body;
  const blogId = req.params.id;

  const blog = await blogModal.findByIdAndUpdate(
    blogId,
    {
      title,
      discription,
    },
    { new: true }
  );
  try {
    await blog.save();
  } catch (error) {
    return res.json({ error }).status(500);
  }
  return res.status(201).json({ message: "post updated successfully ", blog });
};

export const getBlog = async (req, res) => {
  const blogId = req.params.id;
  const blog = await blogModal.findById(blogId).populate("user");
  if (!blog) {
    return res.json({ message: "not found" }).status(404);
  }
  return res.status(200).json({ message: "success ", blog });
};
export const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  const blog = await blogModal.findByIdAndDelete(blogId).populate("user")
  if (!blog) {
    return res.json({ message: "not found" }).status(404);
  }

  try {
   await blog.user.blogs.pull(blog)
   await blog.user.save()
  } catch (error) {
   return res.json({error})
  }
  return res.status(200).json({ message: "success ", blog });
};
