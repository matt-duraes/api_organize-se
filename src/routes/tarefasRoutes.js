
import express from 'express';
import TarefaController from '../controllers/tarefaController.js';
import paginar from '../middlewares/paginar.js';

const routes = express.Router();
routes.route('/tarefas')
    .get(TarefaController.listarTarefas, paginar)
    .post(TarefaController.cadastrarTarefa);

routes.route('/tarefas/:id')
    .get(TarefaController.listarTarefaPorId)
    .put(TarefaController.editarTarefaPorId)
    .delete(TarefaController.deletarTarefaPorId);

export default routes;
