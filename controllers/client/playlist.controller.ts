import { Request, Response } from "express";
import Playlist from "../../models/playlist.model";
import Song from "../../models/song.model";

// [GET] /
export const detail = async (req: Request, res: Response): Promise<void> => {
  try {
    const slugPlaylist = req.params.slugPlaylist;

    const playlist = await Playlist.findOne({
      slug: slugPlaylist,
      status: "public",
      deleted: false,
    });

    const listSongs = [];

    for(const item of playlist.listSongs){
      const song = await Song.findOne({
        _id: item,
        status: "public",
        deleted: false,
      });

      listSongs.push(song);
    }
    
    res.render("client/pages/playlists/detail", {
      pageTitle: "Trang chủ",
      listSongs: listSongs,
      playlist: playlist,
    });
  } catch (error) {
    res.send("404 Not Found");
  }
}
