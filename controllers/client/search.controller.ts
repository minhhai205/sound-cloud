import { Request, Response } from "express";
import Song from "../../models/song.model";

// [GET] /search
export const result = async (req: Request, res: Response): Promise<void> => {
  const keyword =  `${req.query.keyword}`;

  const regexKeyword = new RegExp(keyword, "i");
  
  const listSongs = await Song.find({
    title: regexKeyword,
    status: "public",
    deleted: false,
  });
  
  res.render("client/pages/search/result", {
    pageTitle: keyword,
    listSongs: listSongs,
    keyword: keyword,
  });
}