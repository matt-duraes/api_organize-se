import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import tarefa from "../models/Tarefa.js";
class TarefaController {
    static listarTarefas = async (req, res, next) => {
        try {
            let {limite = 3, pagina = 1} = req.query;
            limite = parseInt(limite);
            pagina = parseInt(pagina);

            if (limite > 0 && pagina > 0) { 
                const listaTarefas = await tarefa.find({})
                .skip((pagina -1) * limite)
                .limit(limite)
                .populate("usuario")
                .exec();
                res.status(200).json(listaTarefas);
            } else {
                next(new RequisicaoIncorreta());
            }

        } catch (erro) {
            next(erro);
        }
    }

    static async listarTarefaPorId(req, res, next) {

        try {
            const id = req.params.id;
            const tarefaEncontrada = await tarefa.findById(id)
                .populate("usuario", "titulo")
                .exec();

            if (tarefaEncontrada !== null) {
                res.status(200).json(tarefaEncontrada);
            } else {
                next(new NaoEncontrado("Id não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async editarTarefaPorId(req, res, next) {
        try {
            const id = req.params.id;
            const tarefaResultado = tarefa.findByIdAndUpdate(id, {$set: req.body});
            
            if(tarefaResultado !== null) {
            res.status(200).json({message: "Tarefa atualizada com sucesso"}); 
            } else {
                next(new NaoEncontrado("Id não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarTarefa(req, res, next) {
        try {
            const novaTarefa = await tarefa.create(req.body);
            res.status(201).json({message: "Tarefa cadastrada com sucesso", tarefa: novaTarefa});
        } catch(erro) {
            next(erro);
        }
    }

    static async deletarTarefaPorId(req, res, next) { 
        try {
            const id = req.params.id;
            await tarefa.findByIdAndDelete(id);
            res.status(200).json({message: "Tarefa deletada com sucesso"});
        } catch (erro) {
            next(erro);
        }
    }

    static async listarTarefasPorUsuario(req, res, next) {
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
        } catch (erro) {
            next(new NaoEncontrado("Nenhuma tarefa encontrada"));
        }
    }
}

export default TarefaController;