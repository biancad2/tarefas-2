const express = require('express');
const connection = require('./database/connection');
const routes = express.Router();

const TarefasController2 = require('./controllers/TarefasController2');


routes.get('/tarefas2', TarefasController2.index)

routes.post('/tarefas2', TarefasController2.create)
routes.delete('/tarefas2/:id', TarefasController2.delete)
routes.put('/tarefas2/:id', TarefasController2.comecar)
routes.put('/tarefas2-parar/:id', TarefasController2.parar)

module.exports = routes;