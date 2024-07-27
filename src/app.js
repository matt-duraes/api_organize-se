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

app.use((erro, req, res, next) => {
    res.status(500).json({message: `Erro interno do servidor ${erro.message} `});  
})

export default app;