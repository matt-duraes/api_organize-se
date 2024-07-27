import {usuario} from "../models/Usuario.js";

class UsuarioController {
    static async listarUsuarios(req, res, next) {
        try {
            const listaUsuarios = await usuario.find({});
            res.status(200).json(listaUsuarios);
        } catch (erro) {
            next(erro);
        }
    }

    static async listarUsuarioPorId(req, res, next) {
        try {
            const id = req.params.id;
            const usuarioEncontrada = await usuario.findById(id);
            res.status(200).json(usuarioEncontrada);
        } catch (erro) {
            next(erro);
        }
    }

    static async editarUsuarioPorId(req, res, next) {
        try {
            const id = req.params.id;
            await usuario.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Usuario atualizado com sucesso"});
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarUsuario(req, res, next) {
        try {
            const novaUsuario = await usuario.create(req.body);
            res.status(201).json({message: "Usuario cadastrada com sucesso", usuario: novaUsuario});
        } catch(erro) {
            next(erro);
        }
    }

    static async deletarUsuarioPorId(req, res, next) { 
        try {
            const id = req.params.id;
            await usuario.findByIdAndDelete(id);
            res.status(200).json({message: "Usuario deletada com sucesso"});
        } catch (erro) {
            next(erro);
        }
    }
}

export default UsuarioController;