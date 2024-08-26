import { Request, Response } from "express";
import Song from "../../models/song.model";

// [GET] /songs/:slug
export const detail = async (req: Request, res: Response): Promise<void> => {
  try {
    const slugSong = req.params.slugSong;

    const song = await Song.findOne({
      slug: slugSong,
      status: "public",
      deleted: false,
    });

    console.log(song)
    res.render("client/pages/songs/detail",{
      pageTitle: song.title,
      song: song,
    });
  } catch (error) {
    res.send("404 Not Found");
  }
}

