import express, { response } from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multerConfig from './config/multer';


const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/items', ItemsController.index);
routes.get('/points', PointsController.index);
routes.get('/points/:id', PointsController.show);

routes.post('/points', 
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }, {
    abortEarly: false,
  }),
  PointsController.create);
  //console.log(JSON.stringify(knex));

export default routes;
