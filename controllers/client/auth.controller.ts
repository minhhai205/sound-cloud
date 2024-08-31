import { Request, Response } from "express";
import User from "../../models/user.model";
import * as generateHelper from "../../helpers/generate.helper";
import md5 from "md5";

// [GET] /auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  res.render("client/pages/auth/register", {
    pageTitle: "Sign up",
  });
}

// [POST] /auth/register
export const registerPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const exitsUser = await User.findOne({
      email: req.body.email,
      deleted: false,
    });

    if(exitsUser){
      req.flash("error", "Email already exists!");
      res.redirect("back");
    }

    else{
      req.body.password = md5(req.body.password);
      req.body.tokenUser = generateHelper.generateRandomString(30);

      const user = new User(req.body);
      await user.save();

      res.cookie("tokenUser", user.tokenUser, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 100)});

      res.redirect("/");
    }
  } catch (error) {
    req.flash("error", "Registration failed!");
    res.redirect("back");
  }
}

// [GET] /auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  res.render("client/pages/auth/login", {
    pageTitle: "Sign in",
  });
}

// [POST] /auth/login
export const loginPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
      email: email,
      deleted: false,
    });

    if(!user){
      req.flash("error", "Email does not exist!");
      res.redirect("back");
      return;
    }

    if(md5(password) != user.password) {
      req.flash("error", "Wrong password!");
      res.redirect("back");
      return;
    }
  
    if(user.status != "active") {
      req.flash("error", "Account has been locked!");
      res.redirect("back");
      return;
    }
  
    res.cookie("tokenUser", user.tokenUser, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 100)});
  
    res.redirect("/");

  } catch (error) {
    req.flash("error", "Login failed!");
    res.redirect("back");
  }
}