import express from 'express';
import dbConnect from './config/dbConnect.js';
import routes from './routes/index.js';

const conexao = await dbConnect();

conexao.on("error", (erro) => {
    console.log("Erro ao conectar ao banco de dados", erro);
});

conexao.once("open", () => {
    console.log("Conectado ao banco de dados");
});

const app = express();
routes(app);

app.delete("/tarefas/:id", (req, res) => {
    const index = buscaTarefa(req.params.id);
    tarefas.splice(index, 1);
    res.status(200).json(tarefas);
})

export default app;