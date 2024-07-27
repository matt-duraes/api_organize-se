import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: [true, "O campo nome é obrigatório"]},
    email: { type: String, required: true, min: 5, max: 255 },
}, { versionKey: false });

const usuario = mongoose.model("usuarios", usuarioSchema);

export { usuario, usuarioSchema };