// controllers/user.controller.js
import User from "../models/user.models.js";
import { throwError } from "../utils/error.js";
import bcrypt from "bcrypt";
import Projects from "../models/project.model.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return throwError(404, "User not found");

    const { password, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Nouvelle méthode pour obtenir tous les utilisateurs
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(throwError(404, error.message));
  }
};

//=======update user api=======//
export const updateUser = async (req, res, next) => {
  const { email, username } = req.body;

  const checkEmail = await User.findOne({ email });
  if (checkEmail) return next(throwError(500, "Invalid Information"));

  const checkUserName = await User.findOne({ username });
  if (checkUserName) return next(throwError(500, "Invalid Information"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(throwError(error));
  }
};

//=====Handle User Delete=====//
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User Deleted Successfully!");
  } catch (error) {
    next(error);
  }
};

//user projects
export const userProjects = async (req, res, next) => {
  try {
    const projects = await Projects.find({ userRef: req.params.id });
    res.status(200).json(projects);
  } catch (error) {
    next(throwError(404, error.message));
  }
};
