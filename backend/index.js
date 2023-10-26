import 'dotenv/config';
import './src/repository/connection.js';
import express from 'express';
import cors from 'cors';
import alarmesController from './src/controller/alarmesController.js';

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.listen(process.env.PORT, () => console.log("API subiu"));

servidor.use('/', alarmesController);
