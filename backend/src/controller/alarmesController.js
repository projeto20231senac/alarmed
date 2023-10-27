import express from 'express';
import { con } from '../repository/connection';

const router = express.Router();

router.get('/alarmes/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const promiseConnection = con.promise();

    const [rows] = await promiseConnection.query('SELECT * FROM alarmes WHERE user_id = ?', [user_id]);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar alarmes do usuário.' });
  }
});

export default router;