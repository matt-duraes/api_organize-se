import express from 'express';
import TarefaController from '../controllers/tarefaController.js';

const routes = express.Router();

routes.route('/tarefas')
    .get(TarefaController.listarTarefas)
    .post(TarefaController.cadastrarTarefa);

routes.route('/tarefas/:id')
    .get(TarefaController.listarTarefaPorId)
    .put(TarefaController.editarTarefaPorId)
    .delete(TarefaController.deletarTarefaPorId);

export default routes;