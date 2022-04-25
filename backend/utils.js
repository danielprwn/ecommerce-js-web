/* eslint-disable spaced-comment */
import jwt from "jsonwebtoken";
import config from "./config";

export const generateToken = (user) =>
  jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );

//Authentication
export const isAuth = (req, res, next) => {
  const holderToken = req.headers.authorization;
  if (!holderToken) {
    res.status(401).send({ message: "You need to provide a token." });
  } else {
    const token = holderToken.slice(7, holderToken.length);
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = data;
        next();
      }
    });
  }
};
