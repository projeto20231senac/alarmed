import multer from "multer";
import express from "express";
import { alterarAlarme, inserirAlarme, listarTodosAlarmes, alarmePorId, removerAlarme, buscarUserPorId, inserirUsuario, alterarUsuario, buscarDetalhesAlarmePorId } from '../repository/alarmeRepository.js'

const endpoint = express.Router();

const updload = multer({ dest: 'storage/fotoMedicamentos' })

//criar um novo alarme
endpoint.post('/alarmes', async (req, resp) => {
    try {
        const novoAlarme = req.body;
        const novo = await inserirAlarme(novoAlarme);
        resp.status(200).send(novo);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

//criar um novo usuario
endpoint.post('/usuarios', async (req, resp) => {
    try {
        console.log(req.body);
        const novoUsuario = await inserirUsuario(req.body.cpf, req.body.cep, req.body.dataNascimento);
        resp.status(200).send(novoUsuario);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
  });

//obter todos os alarmes
endpoint.get('/alarmes', async (req, resp) => {
    try {
        const todosAlarmes = await listarTodosAlarmes()
        resp.send(todosAlarmes)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

//obter dados usuario
endpoint.get('/usuarios/:user_id', async (req, resp) => {
    try {
            const user_id = req.params.user_id
            const buscarUsuariosPorId = await buscarUserPorId(user_id)
            resp.status(200).send(buscarUsuariosPorId)
    } catch(err){
        resp.status(400).send({erro : err.message})
    }
})

//obter alarmes do usuario
endpoint.get('/alarmes/:user_id', async (req, resp) => {
    try {
        const id = req.params.user_id;
        const buscaUserId = await alarmePorId(id);
        console.log(buscaUserId)
        resp.status(200).send(buscaUserId);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

//obter detalhes dos alarmes filtrando pelo alarme_id
endpoint.get('/alarmes/:alarme_id', async (req, resp) => {
    try {
        const id = req.params.alarme_id;
        const buscarDetalhesAlarmePorId = await buscarDetalhesAlarmePorId(id);
        console.log(buscarDetalhesAlarmePorId)
        resp.status(200).send(buscarDetalhesAlarmePorId);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoint.put('/alarmes/:alarme_id', async (req, resp) => {
    try {
        const { alarme_id } = req.params
        const alarme = req.body
        const resposta = await alterarAlarme(alarme_id, alarme)
        resp.status(204).send(resposta)
    } catch (error) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

//atualizar dados do usuario
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

endpoint.delete('/alarmes/:alarme_id', async (req, resp) => {
    try {
        const { alarme_id } = req.params
        const resposta = await removerAlarme(alarme_id)
        resp.status(204).send();
    } catch (error) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoint;