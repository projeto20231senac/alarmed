import multer from "multer";
import { Router } from "express";
import { alterarAlarme, inserirAlarme, listarTodosAlarmes, alarmePorId, removerAlarme } from '../repository/alarmeRepository.js'
const endpoint = Router();
const updload = multer({ dest: 'storage/fotoMedicamentos' })

endpoint.post('/alarmes', async (req, resp) => {
    try {
        const novoAlarme = req.body;
        const novo = await inserirAlarme(novoAlarme);
        resp.send(novo);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

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

endpoint.get('/alarmes/:user_id', async (req, resp) => {
    try {
        const id = req.params.user_id;
        const buscaUserId = await alarmePorId(id);
        resp.send(buscaUserId);
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
        resp.status(204).send()
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