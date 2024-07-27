import tarefa from "../models/Tarefa.js";
import {usuario} from "../models/Usuario.js";
class TarefaController {
    static async listarTarefas(req, res) {
        try {
            let {limite = 3, pagina = 1, ordenacao= "_id:-1"} = req.query;
            let [campoOrdenacao, ordem] = ordenacao.split(":");
            limite = parseInt(limite);
            pagina = parseInt(pagina);
            ordem = parseInt(ordem);

            if (pagina < 1 || limite < 1) { 
                return res.status(400).json({message: "A página e o limite devem ser maiores que 0"});
            }

            const listaTarefas = await tarefa.find({})
                .sort({[campoOrdenacao]: ordem})
                .skip((pagina -1) * limite)
                .limit(limite)
                .populate("usuario")
                .exec();

            res.status(200).json(listaTarefas);
        } catch (erro) {
            res.status(500).json({message: `${erro.message} falha ao buscar tarefas`});
        }
    }

    static async listarTarefaPorId(req, res, next) {
        const id = req.params.id;

        // Verificar se o ID foi fornecido
        if (!id) {
            return res.status(400).json({message: "Id da tarefa não informado"});
        }
        try {
            const tarefaEncontrada = await tarefa.findById(id);
            if (!tarefaEncontrada) { 
                return res.status(404).json({message: "Tarefa não encontrada"});
            }
            res.status(200).json(tarefaEncontrada);
        } catch (erro) {
            next(erro);
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
        const busca = {};
        const regex = new RegExp(req.query.titulo, "i");
        if (req.query.usuario) {
            busca.usuario = req.query.usuario;
        }
        if (req.query.titulo) {
            busca.titulo = regex;

        }
        try {
            const tarefasPorUsuario = await tarefa.find(busca);
            res.status(200).json(tarefasPorUsuario);
        } catch (error) {
            res.status(500).json({message: `${erro.message} falha ao deletar tarefa`});
        }
    }
}

export default TarefaController;