import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    email: { type: String, required: true },
}, {versionKey: false});

const usuario = mongoose.model("Usuario", UsuarioSchema);

export { usuario, UsuarioSchema };