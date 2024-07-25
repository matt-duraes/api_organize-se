import tarefa from "../models/Tarefa.js";
import {usuario} from "../models/Usuario.js";
class TarefaController {
    static async listarTarefas(req, res) {
        try {
            const listaTarefas = await tarefa.find({}).populate("usuario").exec();
            res.status(200).json(listaTarefas);
        } catch (erro) {
            res.status(500).json({message: `${erro.message} falha ao buscar tarefas`});
        }
    }

    static async listarTarefaPorId(req, res) {
        try {
            const id = req.params.id;
            const tarefaEncontrada = await tarefa.findById(id);
            res.status(200).json(tarefaEncontrada);
        } catch (erro) {
            res.status(500).json({message: `${erro.message} falha ao buscar tarefa`});
        }
    }

    static async editarTarefaPorId(req, res) {
        try {
            const id = req.params.id;
            await tarefa.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Tarefa atualizada com sucesso"});
        } catch (erro) {
            res.status(500).json({message: "Falha na atualização da tarefa"});
        }
    }

    static async cadastrarTarefa(req, res) {
        try {
            const novaTarefa = await tarefa.create(req.body);
            res.status(201).json({message: "Tarefa cadastrada com sucesso", tarefa: novaTarefa});
        } catch(erro) {
            res.status(500).json({message: `${erro.message} falha ao cadastrar tarefa`});
        }
    }

    static async deletarTarefaPorId(req, res) { 
        try {
            const id = req.params.id;
            await tarefa.findByIdAndDelete(id);
            res.status(200).json({message: "Tarefa deletada com sucesso"});
        } catch (erro) {
            res.status(500).json({message: `${erro.message} falha ao deletar tarefa`});
        }
    }

    static async listarTarefasPorUsuario(req, res) {
        const usuario = req.query.usuario;
        try {
            const tarefasPorUsuario = await tarefa.find({usuario: usuario});
            res.status(200).json(tarefasPorUsuario);
        } catch (error) {
            res.status(500).json({message: `${erro.message} falha ao deletar tarefa`});
        }
    }
}

export default TarefaController;