import multer from "multer";
import express from "express";
<<<<<<< HEAD
import {inserirUsuario, listarTodosUsuario, buscarUserPorCep, buscarUserPorId, alterarUsuario} from '../repository/usuarioRepository.js'
=======
import {inserirUsuario,listarTodosUsuario,buscarUserPorCep} from '../repository/usuarioRepository.js'
>>>>>>> 8bd45c5e6ec132fe3f6af0d20ba3d827dfd05628

const endpoint = express.Router();

const updload = multer({ dest: 'storage/fotoMedicamentos' })

<<<<<<< HEAD
//criar um novo usuario
endpoint.post('/usuarios', async (req, resp) => {
    try {
        console.log(req.body);
        const novoUsuario = await inserirUsuario(req.body.user_id, req.body.cep, req.body.dataNascimento);
        resp.status(200).send(novoUsuario);
       
    } catch (error) {
        resp.status(400).send({ erro: error.message });
    }
  });

  //listar todos os usuarios
=======

endpoint.post('/usuarios', async (req, resp) => {
    try {
        console.log(req.body);
        const novoUsuario = await inserirUsuario(req.body.cpf, req.body.cep, req.body.dataNascimento);
        resp.status(200).send(novoUsuario);
       
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
  });

>>>>>>> 8bd45c5e6ec132fe3f6af0d20ba3d827dfd05628
  endpoint.get('/usuarios', async (req, resp) => {
    try {
        const todosusuario = await listarTodosUsuario()
        resp.send(todosusuario)
<<<<<<< HEAD
    } catch (error) {
        resp.status(400).send({ erro: error.message })
    }
})

//listar usuarios por user_id
endpoint.get('/usuarios/:user_id', async (req, resp) => {
    try {
            const user_id = req.params.user_id
            const buscarUsuario = await buscarUserPorId(user_id)
            resp.status(200).send(buscarUsuario)
    } catch(error){
        resp.status(400).send({erro : error.message})
    }
}) 



//atualizar usuários por user_id
=======
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




>>>>>>> 8bd45c5e6ec132fe3f6af0d20ba3d827dfd05628
endpoint.put('/usuarios/:user_id', async (req, resp) => {
    try {
        const id = req.params.user_id;
        const updatedData = req.body;
        const resposta = await alterarUsuario(id, updatedData)
        resp.sendStatus(204)
    } catch (error) {
<<<<<<< HEAD
        resp.status(400).send({ erro: error.message })
    }
})

=======
        resp.status(400).send({
            erro: error.message
        })
    }
})



>>>>>>> 8bd45c5e6ec132fe3f6af0d20ba3d827dfd05628
export default endpoint;