import multer from "multer";
import express from "express";
import {inserirUsuario,listarTodosUsuario,buscarUserPorCep} from '../repository/usuarioRepository.js'

const endpoint = express.Router();

const updload = multer({ dest: 'storage/fotoMedicamentos' })


endpoint.post('/usuarios', async (req, resp) => {
    try {
        console.log(req.body);
        const novoUsuario = await inserirUsuario(req.body.cpf, req.body.cep, req.body.dataNascimento);
        resp.status(200).send(novoUsuario);
       
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
  });

  endpoint.get('/usuarios', async (req, resp) => {
    try {
        const todosusuario = await listarTodosUsuario()
        resp.send(todosusuario)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoint.get('/usuario/:cpf', async (req, resp) => {
    try {
            const user = req.params.cpf
            const buscarUsuario = await buscarUserPorCep(user)
            resp.status(200).send(buscarUsuario)
    } catch(err){
        resp.status(400).send({erro : err.message})
    }
})




endpoint.put('/usuarios/:user_id', async (req, resp) => {
    try {
        const id = req.params.user_id;
        const updatedData = req.body;
        const resposta = await alterarUsuario(id, updatedData)
        resp.sendStatus(204)
    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})



export default endpoint;