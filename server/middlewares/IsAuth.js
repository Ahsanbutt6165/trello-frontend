import jwt from "jsonwebtoken";
import TryCatch from "../utils/TryCatch.js";
import { User } from "../models/User/UserModel.js";

export const isAuth = TryCatch(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(403).json({ message: "please login" });

  const decodedData = jwt.verify(token, process.env.JWT_SEC);
  if (!decodedData) return res.status(403).json({ message: "token expired" });

  req.user = await User.findById(decodedData.id);

  next();
});
