import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import alarmeController from './controller/alarmeController.js'

const servidor = express();
servidor.use(cors());
servidor.use(express.json())
servidor.use(alarmeController);

servidor.listen(process.env.PORT, () => console.log("API no Ar!!!!"))