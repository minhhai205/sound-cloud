import { Request, Response } from "express";
import Song from "../../models/song.model";

// [GET] /songs/detail/:slug
export const detail = async (req: Request, res: Response): Promise<void> => {
  try {
    const slugSong = req.params.slugSong;

    const song = await Song.findOne({
      slug: slugSong,
      status: "public",
      deleted: false,
    });

    res.render("client/pages/songs/detail",{
      pageTitle: song.title,
      song: song,
    });
  } catch (error) {
    res.send("404 Not Found");
  }
}

// [PATCH] /songs/like/:type/:id
export const like = async (req: Request, res: Response): Promise<void> => {
  try {
    const song = await Song.findOne({
      _id: req.params.id,
      status: "public",
      deleted: false,
    });
   
    const like = req.params.type == "like" ? song.like + 1 : song.like - 1;
    
    await Song.updateOne({
      _id: req.params.id,
      status: "public",
      deleted: false,
    }, {
      like : like,
    });

    res.json({
      code: 200,
      message: "Success",
      like: like,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Faile",
    });
  }
}

