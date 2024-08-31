import { Request, Response, NextFunction } from 'express';

export const loginPost = (req: Request, res: Response, next: NextFunction) => {
  if(!req.body.email){
    req.flash("error", "Please enter Email!");
    res.redirect("back");
    return;
  }

  if(!req.body.password){
    req.flash("error", "Please enter Password!");
    res.redirect("back");
    return;
  }

  next()
};

export const registerPost = (req: Request, res: Response, next: NextFunction) => {
  if(!req.body.fullName){
    req.flash("error", "Please enter full name!");
    res.redirect("back");
    return;
  }

  if(!req.body.email){
    req.flash("error", "Please enter email!");
    res.redirect("back");
    return;
  }

  if(!req.body.password){
    req.flash("error", "Please enter password!");
    res.redirect("back");
    return;
  }

  next()
};