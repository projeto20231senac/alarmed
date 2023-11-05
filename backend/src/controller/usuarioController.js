import multer from "multer";
import express from "express";
import {inserirUsuario, listarTodosUsuario, buscarUserPorCep, buscarUserPorId, alterarUsuario} from '../repository/usuarioRepository.js'

const endpoint = express.Router();

const updload = multer({ dest: 'storage/fotoMedicamentos' })

//criar um novo usuario
endpoint.post('/usuarios', async (req, resp) => {
    try {
        console.log(req.body);
        const novoUsuario = await inserirUsuario(req.body.cpf, req.body.cep, req.body.dataNascimento);
        resp.status(200).send(novoUsuario);
       
    } catch (error) {
        resp.status(400).send({ erro: error.message });
    }
  });

  //listar todos os usuarios
  endpoint.get('/usuarios', async (req, resp) => {
    try {
        const todosusuario = await listarTodosUsuario()
        resp.send(todosusuario)
    } catch (error) {
        resp.status(400).send({ erro: error.message })
    }
})

//listar usuarios por cpf
endpoint.get('/usuarios/:cpf', async (req, resp) => {
    try {
            const cpf = req.params.cpf
            const buscarUsuario = await buscarUserPorId(cpf)
            resp.status(200).send(buscarUsuario)
    } catch(error){
        resp.status(400).send({erro : error.message})
    }
}) 



//atualizar usuários por cpf
endpoint.put('/usuarios/:cpf', async (req, resp) => {
    try {
        const id = req.params.cpf;
        const updatedData = req.body;
        const resposta = await alterarUsuario(id, updatedData)
        resp.sendStatus(204)
    } catch (error) {
        resp.status(400).send({ erro: error.message })
    }
})

export default endpoint;