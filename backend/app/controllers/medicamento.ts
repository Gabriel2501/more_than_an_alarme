import { Request, Response } from "express";
import Medicamento from "../models/Medicamento";

export default {
    async list(req: Request, res: Response): Promise<any> {
        let medicamentos = await Medicamento.findAll({});
        return res.status(200).json(medicamentos);
    },
    async detail(req: Request, res: Response): Promise<any> {
        let medicamento = await Medicamento.findByPk(parseInt(req.params.id));
        if (medicamento) return res.status(200).json(medicamento);
        return res.status(404).json({});
    },
    async create(req: Request, res: Response): Promise<any> {
        const obj: any = req.body;
        let medicamento = await Medicamento.create(obj);
        return res.status(200).json(medicamento);
    },
    async edit(req: Request, res: Response): Promise<any> {
        const id: any = req.params.id;
        let obj: any = req.body;
        delete obj.id;

        let medicamento = await Medicamento.update(obj, { where: { id: id } });

        if (medicamento[0]) return res.status(200).json({});
        return res.status(404).json({});
    },
    async delete(req: Request, res: Response): Promise<any> {
        const id: any = req.params.id;

        let alarmes = await Medicamento.destroy({
            where: { id: id }
        });

        if (alarmes) return res.status(200).json({});
        return res.status(404).json({});
    }
}