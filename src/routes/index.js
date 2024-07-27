import express from "express";
import tarefas from "./tarefasRoutes.js"
import usuarios from "./usuarioRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("api node"));
    app.use(express.json(), tarefas, usuarios);
};

export default routes;