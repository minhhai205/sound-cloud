import { Request, Response } from "express";
import Song from "../../models/song.model";
import Playlist from "../../models/playlist.model";
import unidecode from "unidecode";
import { searchOption } from "../../helpers/searchOption.helper"

// [GET] /search
export const result = async (req: Request, res: Response): Promise<void> => {
  const keyword =  `${req.query.keyword}`;

  const regexKeyword = new RegExp(keyword, "i");
  
  const unidecodeText: string = unidecode(keyword);
  const keywordSlug = unidecodeText.replace(/\s+/g, "-");
  const keyWordSlugRegex = new RegExp(keywordSlug, "i");
  
  const dataSearchOption = searchOption("");

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
    dataSearchOption: dataSearchOption,
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
    
    const dataSearchOption = searchOption("songs");
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
        dataSearchOption: dataSearchOption,
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

// [GET] /search/playlists
export const playlists = async (req: Request, res: Response): Promise<void> => {
  if(req.query.keyword){
    const keyword =  `${req.query.keyword}`;
    const regexKeyword = new RegExp(keyword, "i");
  
    const unidecodeText: string = unidecode(keyword);
    const keywordSlug = unidecodeText.replace(/\s+/g, "-");
    const keyWordSlugRegex = new RegExp(keywordSlug, "i");
    
    const dataSearchOption = searchOption("playlists");
    try {
      const playlists = await Playlist.find({
        $or: [
          { title: regexKeyword},
          { slug: keyWordSlugRegex},
        ],
        status: "public",
        deleted: false,
      });
      
      res.render("client/pages/search/playlist", {
        pageTitle: keyword,
        playlists: playlists,
        keyword: keyword,
        dataSearchOption: dataSearchOption,
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
