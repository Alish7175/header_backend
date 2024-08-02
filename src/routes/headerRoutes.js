import express from 'express';

const headerRoutes = express.Router();

// const userController = require('../controllers/userController');
import { headerController } from "../controllers/UserController.js";

headerRoutes.get('/menus', headerController.getHeaderMenu);
headerRoutes.post('/add_menu', headerController.inserHeaderMenu);
headerRoutes.post('/update_menu', headerController.updateHeaderMenu);
headerRoutes.delete('/delete_menu/:menuid', headerController.deleteHeaderMenu);

export default headerRoutes;

