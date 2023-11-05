import multer from "multer";
import express from "express";
import { alterarAlarme, inserirAlarme, listarTodosAlarmes, alarmePorId, removerAlarme, buscarDetalhesAlarmePorId } from '../repository/alarmeRepository.js'

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

//obter alarmes do usuario
endpoint.get('/alarmes/:cpf', async (req, resp) => {
    try {
        const cpf = req.params.cpf;
        const buscaAlarmePorId = await alarmePorId(cpf);
        console.log(buscaAlarmePorId)
        resp.status(200).send(buscaAlarmePorId);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

//obter detalhes dos alarmes filtrando pelo alarme_id e horarios_id
endpoint.get('/detalhes/:alarme_id/:horarios_id', async (req, resp) => {
    try {
        const alarme_id = req.params.alarme_id;
        const horarios_id = req.params.horarios_id;
        const buscaDetalhesAlarmePorId = await buscarDetalhesAlarmePorId(alarme_id, horarios_id);
        console.log(buscaDetalhesAlarmePorId)
        resp.status(200).send(buscaDetalhesAlarmePorId);
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