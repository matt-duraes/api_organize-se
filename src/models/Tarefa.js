import mongoose from "mongoose";

const tarefaSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    titulo: {type: String, required: [true, "O campo título é obrigatório"]},
    tempo: {type: Number, required: [true, "O campo tempo é obrigatório"]},
    statusTarefa: {type: String, required: [true, "O status é obrigatório"]},
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'usuarios', required: [true, "O usuário é obrigatório"]},
}, {versionKey: false});

const tarefa = mongoose.model("tarefas", tarefaSchema);

export default tarefa;