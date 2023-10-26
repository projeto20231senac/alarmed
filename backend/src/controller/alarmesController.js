import express from 'express'
import { con } from '../repository/connection.js'

const router = express.Router();

router.get('/alarmes/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const [rows] = await con.query('SELECT * FROM alarmes WHERE user_id = ?', [user_id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar alarmes do usuário.' });
  }
});

export default router;