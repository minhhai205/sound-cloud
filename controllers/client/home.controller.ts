import { Request, Response } from "express";
import Playlist from "../../models/playlist.model";

// [GET] /
export const index = async (req: Request, res: Response): Promise<void> => {
  const playlists = await Playlist.find({
    deleted: false,
    status: "active",
  });

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    playlists: playlists,
  });
}
