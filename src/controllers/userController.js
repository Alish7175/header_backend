


import { HeaderService } from "../services/headerService.js"

export const headerController = {
  getHeaderMenu: async function (req, res, next){
    const {id} = req.query;
    try {
      let result = await HeaderService.getHeaderMenu(id);
      res.json(result);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  inserHeaderMenu: async function (req, res, next){
    try {
      let result = await HeaderService.insertHeaderMenus(req.body);
      res.json(result);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  updateHeaderMenu: async function (req, res, next){
    try {
      let result = await HeaderService.updateHeaderMenu(req.body);
      res.json(result);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  deleteHeaderMenu: async function (req, res, next){
    try {
      let result = await HeaderService.deleteHeaderMenu(req.params);
      res.json(result);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

