import { userModal } from "../modals/userSchema.js";
import bcrypt from "bcryptjs";
export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await userModal.find();
  } catch (error) {
    res.json({ error }).status(500);
  }
  if (!users.length) {
    return res.status(404).json({ message: "no users found " });
  } else {
    return res
      .status(200)
      .json({ message: "getting users successfully ", users });
  }
};

export const signUpUser = async (req, res) => {
  const { name,email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userModal.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res.json({ message: "user already exists" });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = new userModal({
    name,
    email,
    password: hashedPassword,
    blogs:[]
  });

  try {
    await newUser.save();
  } catch (error) {
    return res.status(500).json({ error });
  }
  return res.status(201).json({ newUser, message: "user succefully created " });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userModal.findOne({ email });
  } catch (error) {
    return res.status(500).json({ error });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "user not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (isPasswordCorrect) {
    return res.status(200).json({ message: "logged in successfully" });
  }

  return res.status(500).json({ message: "something went wrong" });
};
