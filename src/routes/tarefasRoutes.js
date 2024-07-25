import express from "express";
import TarefaController from "../controllers/tarefaController.js";

const routes = express.Router();

routes.get('/tarefas', TarefaController.listarTarefas)
routes.get('/tarefas/busca', TarefaController.listarTarefasPorUsuario)
routes.get('/tarefas/:id', TarefaController.listarTarefaPorId)
routes.post('/tarefas', TarefaController.cadastrarTarefa);
routes.put('/tarefas/:id', TarefaController.editarTarefaPorId)
routes.delete('/tarefas/:id', TarefaController.deletarTarefaPorId);

export default routes;