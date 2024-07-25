import mongoose from "mongoose";

const tarefaSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    titulo: {type: String, required: true},
    tempo: {type: String, required: true},
    statusTarefa: {type: String, required: true}
}, {versionKey: false});

const tarefa = mongoose.model("tarefas", tarefaSchema);

export default tarefa;