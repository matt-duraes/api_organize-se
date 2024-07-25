import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';

const routes = express.Router();

routes.route('/usuarios')
    .get(UsuarioController.listarUsuarios)
    .post(UsuarioController.cadastrarUsuario);

routes.route('/usuarios/:id')
    .get(UsuarioController.listarUsuarioPorId)
    .put(UsuarioController.editarUsuarioPorId)
    .delete(UsuarioController.deletarUsuarioPorId);

export default routes;