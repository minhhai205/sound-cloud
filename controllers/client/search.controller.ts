import { Request, Response } from "express";
import Song from "../../models/song.model";
import unidecode from "unidecode";

// [GET] /search
export const result = async (req: Request, res: Response): Promise<void> => {
  const keyword =  `${req.query.keyword}`;

  const regexKeyword = new RegExp(keyword, "i");
  
  const unidecodeText: string = unidecode(keyword);
  const keywordSlug = unidecodeText.replace(/\s+/g, "-");
  const keyWordSlugRegex = new RegExp(keywordSlug, "i");
  

  const listSongs = await Song.find({
    $or: [
      { title: regexKeyword},
      { slug: keyWordSlugRegex},
    ],
    status: "public",
    deleted: false,
  });
  
  res.render("client/pages/search/result", {
    pageTitle: keyword,
    listSongs: listSongs,
    keyword: keyword,
  });
}