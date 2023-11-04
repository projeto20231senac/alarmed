import 'dotenv/config';
import './src/repository/connection.js';
import express from 'express';
import cors from 'cors';
import alarmesController from './src/controller/alarmeController.js';
import usuarioController from './src/controller/usuarioController.js';

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.listen(process.env.PORT, () => console.log("A API subiu na porta " + process.env.PORT));

servidor.use('/', alarmesController);
servidor.use('/', usuarioController);