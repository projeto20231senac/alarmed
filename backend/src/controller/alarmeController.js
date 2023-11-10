import multer from "multer";
import express from "express";
import { alterarAlarme, inserirAlarme, listarTodosAlarmes, alarmePorCpf, removerAlarme, buscarDetalhesAlarmePorId, inserirMedicamento } from '../repository/alarmeRepository.js'

const endpoint = express.Router();

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'storage/fotosMedicamentos/')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    },
    
    
})
const upload = multer({ storage: storage
  })
//criar um novo alarme
endpoint.post('/alarmes',upload.single('foto'), async (req, resp) => {
    try {
        
      if(req.file.mimetype != 'image/jpeg' || req.file.mimetype  != 'image/png'){
        resp.status(422).send({
            erro:'Tipo de imagem não suportado. Por favor insira imagem válida.'
        })
      }else{

          const novoAlarme = req.body;
          novoAlarme.foto= req.file.filename
          const novo = await inserirAlarme(novoAlarme);
          resp.status(200).send(novoAlarme)
         
      }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})
endpoint.post('/medicamentos', async (req, resp) => {
    try {
        
     

          const novoMedicamento = req.body;
          const medicamento = await inserirMedicamento(novoMedicamento);
          resp.status(200).send(medicamento)
         
      
    } catch (err) {
        console.log("Oi",err);
        resp.status(400).send({
            erro: err.message
        })
    }
})


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
        const buscaAlarmePorCpf = await alarmePorCpf(cpf);
        console.log(buscaAlarmePorCpf)
        resp.status(200).send(buscaAlarmePorCpf);
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

endpoint.put('/alarmes/editar/:alarme_id}/:horarios_id}', async (req, resp) => {
    try {
        const alarme_id = req.params.alarme_id
        const horarios_id = req.params.horarios_id
        const resposta = await alterarAlarme(alarme_id, horarios_id, req.bodyalarme_nome, req.bodyalarme_recorrencia, req.bodyhora, req.bodymedicamentos_tipo, req.bodymedicamentos_dose, req.bodymedicamentos_posologia)
        resp.sendStatus(204)
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
        resp.sendStatus(204);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoint;