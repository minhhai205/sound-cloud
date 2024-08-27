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

// [GET] /search/songs
export const songs = async (req: Request, res: Response): Promise<void> => {
  if(req.query.keyword){
    const keyword =  `${req.query.keyword}`;
    const regexKeyword = new RegExp(keyword, "i");
  
    const unidecodeText: string = unidecode(keyword);
    const keywordSlug = unidecodeText.replace(/\s+/g, "-");
    const keyWordSlugRegex = new RegExp(keywordSlug, "i");
    

    try {
      const listSongs = await Song.find({
        $or: [
          { title: regexKeyword},
          { slug: keyWordSlugRegex},
        ],
        status: "public",
        deleted: false,
      });
      
      res.render("client/pages/search/song", {
        pageTitle: keyword,
        listSongs: listSongs,
        keyword: keyword,
      });
    } catch (error) {
      res.render("client/pages/search/index", {
        pageTitle: "Search",
      });
    }
  }
  else {
    res.render("client/pages/search/index", {
      pageTitle: "Search",
    });
  }
}
