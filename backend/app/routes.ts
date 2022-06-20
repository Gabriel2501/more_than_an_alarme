import { Router } from "express";
import AlarmeController from "../app/controllers/alarme";
import MedicamentoController from "../app/controllers/medicamento";

const routes = Router();

routes.get("/alarme", AlarmeController.list);
routes.get("/medicamento", MedicamentoController.list);

routes.get("/alarme/:id", AlarmeController.detail);
routes.get("/medicamento/:id", MedicamentoController.detail);

routes.post("/alarme", AlarmeController.create);
routes.post("/medicamento", MedicamentoController.create);

routes.patch("/alarme/:id", AlarmeController.edit);
routes.patch("/medicamento/:id", MedicamentoController.edit);


routes.delete("/alarme/:id", AlarmeController.delete);
routes.delete("/medicamento/:id", MedicamentoController.delete);

export default routes;