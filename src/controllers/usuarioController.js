import usuario from "../models/Usuario.js";

class UsuarioController {
    static async listarUsuarios(req, res) {
        try {
            const listaUsuarios = await usuario.find({});
            res.status(200).json(listaUsuarios);
        } catch (erro) {
            res.status(500).json({message: `${erro.message} falha ao buscar usuarios`});
        }
    }

    static async listarUsuarioPorId(req, res) {
        try {
            const id = req.params.id;
            const usuarioEncontrada = await usuario.findById(id);
            res.status(200).json(usuarioEncontrada);
        } catch (erro) {
            res.status(500).json({message: `${erro.message} falha ao buscar usuario`});
        }
    }

    static async editarUsuarioPorId(req, res) {
        try {
            const id = req.params.id;
            await usuario.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Usuario atualizada com sucesso"});
        } catch (erro) {
            res.status(500).json({message: "Falha na atualização da usuario"});
        }
    }

    static async cadastrarUsuario(req, res) {
        try {
            const novaUsuario = await usuario.create(req.body);
            res.status(201).json({message: "Usuario cadastrada com sucesso", usuario: novaUsuario});
        } catch(erro) {
            res.status(500).json({message: `${erro.message} falha ao cadastrar usuario`});
        }
    }

    static async deletarUsuarioPorId(req, res) { 
        try {
            const id = req.params.id;
            await usuario.findByIdAndDelete(id);
            res.status(200).json({message: "Usuario deletada com sucesso"});
        } catch (erro) {
            res.status(500).json({message: `${erro.message} falha ao deletar usuario`});
        }
    }
}

export default UsuarioController;