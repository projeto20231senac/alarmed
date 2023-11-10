import multer from "multer";
import express from "express";
import {inserirUsuario, buscarUserPorCpf, alterarUsuario} from '../repository/usuarioRepository.js'

const endpoint = express.Router();


//criar um novo usuario
endpoint.post('/usuarios', async (req, resp) => {
    try {
        const novoUsuario = req.body
        const adicionarUsuario = await inserirUsuario(novoUsuario);
        console.log(adicionarUsuario);
        resp.status(200).send(adicionarUsuario);
       
    } catch (error) {
        resp.status(400).send({ erro: error.message });
    }
  });

//listar usuarios por cpf
endpoint.get('/usuarios/:cpf', async (req, resp) => {
    try {
            const cpf = req.params.cpf
            const buscarUsuario = await buscarUserPorCpf(cpf)
            resp.status(200).send(buscarUsuario)
    } catch(error){
        resp.status(400).send({erro : error.message})
    }
}) 

//atualizar usuários por cpf
endpoint.put('/usuario/:cpf', async (req, resp) => {
    try {
        const {cpf} = req.params
        const updatedData = req.body;
        const resposta = await alterarUsuario(cpf, updatedData)
        resp.status(204).send()
    } catch (error) {
        resp.status(400).send({ erro: error.message })
    }
})
endpoint.put('/pessoa/:cpf', async(req,resp) => {
    try {
        const { cpf} = req.params;
        const  produto = req.body;
        const resposta = await alterarProduto(cpf,produto);
        resp.status(204).send()
    }catch(err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

endpoint.put('/filme/:id', async (req, resp) => {
    try {
      const { id } = req.params;
      const filme = req.body;
  
      const resposta = await alterarFilme(id, filme);
      
      resp.status(204).send();
  
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
  })

export default endpoint;