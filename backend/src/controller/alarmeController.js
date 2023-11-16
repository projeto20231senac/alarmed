import multer from "multer";
import express from "express";
import { alterarAlarme, alterarImagem,alterarTipoNovoAlarme, alterarMedicamento, alterarRecorrencia, inserirAlarme, inserirHorarios, listarTodosAlarmes, alarmePorCpf, removerAlarme, buscarDetalhesAlarmePorId, promocoesPorCep } from '../repository/alarmeRepository.js'

const endpoint = express.Router();

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/fotosMedicamentos')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    },
    
    
})
const upload = multer({ storage: storage
  })

//editar um novo alarme com a imagem
endpoint.put('/alarmes/:alarme_id/foto', upload.single('foto'), async (req, resp) => {
    try {
        if(req.file.mimetype != 'image/jpeg' && req.file.mimetype  != 'image/png'){
                    resp.status(422).send({
                        erro:'Tipo de imagem não suportado. Por favor insira imagem válida.'
                    })
                  }else{
    const {alarme_id} = req.params;
            const imagem = req.file.filename;
            const resposta = await alterarImagem(imagem, alarme_id)
   
      resp.status(204).send();
      console.log(alarme_id);
                  }
    } catch (err) {
        console.log("qual foi o erro?",err);
        resp.status(400).send({
            erro: err.message
        })
    }
  })


//criar um novo alarme
endpoint.post('/alarmes', async (req, resp) => {
    try {
          const {medicamento, cpf} = req.body;
          const novoAlarme = await inserirAlarme(medicamento, cpf);
          resp.status(200).send({alarme_id: novoAlarme.alarme_id})

    } catch (err) { resp.status(400).send({error: err.message})}
})

//cria um novo medicamento e insere o medicamentos_tipo
endpoint.post('/tipo/:alarme_id', async (req, resp) => {
    try{
        const alarme_id = req.params.alarme_id
        const { tipo, cpf } = req.body
        const resposta = await alterarTipoNovoAlarme(alarme_id, tipo, cpf)
        resp.status(200).send({medicamentos_id: resposta.medicamentos_id})

    } catch (err) { resp.status(400).send({erro: err.message})}
})

endpoint.post('/horarios/:cpfNovoAlarme/:novoAlarmeId/:novoMedicamentosId', async (req, resp) => {
    try {
        const cpfNovoAlarme = req.params.cpfNovoAlarme
        const novoAlarmeId = req.params.novoAlarmeId
        const novoMedicamentosId = req.params.novoMedicamentosId
        const horarios = req.body.horarios;

        console.log("No controller: ", horarios)

        const resposta = await inserirHorarios(cpfNovoAlarme, novoAlarmeId, novoMedicamentosId, horarios);
        resp.status(200).send(resposta)

    } catch (err) { resp.status(400).send({erro: err.message})}
})

endpoint.put('/medicamentos/editar/:novoMedicamentosId', async (req, resp) => {
    try {
          const novoMedicamentosId = req.params.novoMedicamentosId;
          const {novoAlarmeId, cpf, dose, unidade} = req.body
          const medicamento = await alterarMedicamento(novoMedicamentosId, novoAlarmeId, cpf, dose, unidade);
          resp.status(204).send(medicamento)
    } catch (err) {resp.status(400).send({ erro: err.message })
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

//obter promocoes do cep
endpoint.get('/promocoes/:cep/:alarmeNome', async (req, resp) => {
    try {
        const cep = req.params.cep;
        const alarmeNome = req.params.alarmeNome;
        console.log('Promocoes de:', cep, alarmeNome)
        const buscaPromocoesPorCep = await promocoesPorCep(cep, alarmeNome);
        console.log(buscaPromocoesPorCep)
        resp.status(200).send(buscaPromocoesPorCep);
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

endpoint.put('/alarmes/editar/:alarme_id/:horarios_id', async (req, resp) => {
    try {
        const alarme_id = req.params.alarme_id
        const horarios_id = req.params.horarios_id
        const { alarme_nome, alarme_recorrencia, hora, medicamentos_tipo, medicamentos_dose, medicamentos_posologia } = req.body;

        const resposta = await alterarAlarme(alarme_id, horarios_id, alarme_nome, alarme_recorrencia, hora, medicamentos_tipo, medicamentos_dose, medicamentos_posologia);
        
        resp.sendStatus(204)
    }catch (err){ resp.status(400).send({erro: err.message})} 
})

endpoint.put('/alarmes/recorrencia/:cpfNovoAlarme/:novoAlarmeId', async (req, resp) => {
    try{
        
        const cpfNovoAlarme = req.params.cpfNovoAlarme
        const novoAlarmeId = req.params.novoAlarmeId
        const { recorrencia } = req.body;

        const reposta = await alterarRecorrencia(cpfNovoAlarme, novoAlarmeId, recorrencia)

        resp.sendStatus(204)
    }catch (err){ resp.status(400).send({erro: err.message})} 
})

endpoint.delete('/alarmes/deletar/:alarme_id/:horarios_id', async (req, resp) => {
    try {
        const { alarme_id, horarios_id} = req.params
        const resposta = await removerAlarme(alarme_id, horarios_id)
        resp.sendStatus(204);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoint;