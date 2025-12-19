import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
  const { email, name, password } = req.body;
  if (name == "" || email == "" || password == "")
    return res.status(400).json({ message: "all field are required" });

  let user = await User.findOne({ email });
  if (user) return res.json({ msg: "user already exist..." });
  const hashpass = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashpass,
  });

  res.json({ message: "user Register Successfully", user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (email == "" || password == "")
    return res.status(400).json({ message: "all field are required" });

  const user = await User.findOne({ email });

  if (!user) return res.json({ msg: "Invalid creditinal" });

  const validpass = await bcrypt.compare(password, user.password);
  if (!validpass) {
    return res.json({ msg: "Invalid creditinal" });
  }

  const token=jwt.sign({userId:user._id},process.env.JWT_Secret,{expiresIn:'1d'})


  res.json({ message: `welcome back ${user.name}`,token });
};
