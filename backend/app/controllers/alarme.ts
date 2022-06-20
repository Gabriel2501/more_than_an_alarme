import { Request, Response } from "express";
import Alarme from "../models/Alarme";

export default {
    async list(req: Request, res: Response): Promise<any> {
        let alarmes = await Alarme.findAll({});
        return res.status(200).json(alarmes);
    },
    async detail(req: Request, res: Response): Promise<any> {
        let alarme = await Alarme.findByPk(parseInt(req.params.id));
        if (alarme) return res.status(200).json(alarme);
        return res.status(404).json({});
    },
    async create(req: Request, res: Response): Promise<any> {
        const obj: any = req.body;
        let alarme = await Alarme.create(obj);
        return res.status(200).json(alarme);
    },
    async edit(req: Request, res: Response): Promise<any> {
        const id: any = req.params.id;
        let obj: any = req.body;
        delete obj.id;

        let alarme = await Alarme.update(obj, { where: { id: id } });

        if (alarme[0]) return res.status(200).json({});
        return res.status(404).json({});
    },
    async delete(req: Request, res: Response): Promise<any> {
        const id: any = req.params.id;

        let alarmes = await Alarme.destroy({
            where: { id: id }
        });

        if (alarmes) return res.status(200).json({});
        return res.status(404).json({});
    }
}