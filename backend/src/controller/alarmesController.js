import express from 'express'
import { con } from '../repository/connection.js'

const router = express.Router();

router.get('/alarmes/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const sql = 'SELECT * FROM alarmes WHERE user_id = ?';

  // Execute the SQL query
  con.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Erro ao executar a query: ', err);
      res.status(500).json({ error: 'Erro ao buscar alarmes do usuário.' });
      return;
    }
    res.json(results);
  });
});

export default router;