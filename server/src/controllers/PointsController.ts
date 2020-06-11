import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items','points.id','=','point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf',String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map((point: any) => {
      return {
        ...point,
        image_url: `http://192.168.15.19:3333/uploads/${point.image}`
      };
    });

    return res.json(serializedPoints);
  }
  async show(req:Request, res:Response){
    const { id } = req.params;

    const point = await knex('points').where('id',id).first();
    if(!point){
      return res.status(400).json({error:'Point not found'})
    }

    const items = await knex('items')
      .join('point_items','items.id','=','point_items.item_id')
      .where('point_items.point_id',id)
      .select('items.title');

    const serializedPoint =  {
      ...point,
      image_url: `http://192.168.15.19:3333/uploads/${point.image}`
    };
    return res.json({point: serializedPoint, items});
  }
  async create(req: Request, res: Response) {

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body;

    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }
    const trx = await knex.transaction();

    try {
      const insertedIds = await trx('points')
        //.returning('id')
        .insert(point, 'id');
      const id = insertedIds[0];
      const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
        return {
          item_id,
          point_id: id,
        };
      });
      const ids = await trx('point_items')
        .insert(pointItems, 'point_id');
      await trx.commit();

      return res.json({
        id,
        ...point,
        items
      });
    } catch (error) {
      await trx.rollback();
      return res.status(500).json({ error });
    }
  }
}

export default new PointsController();