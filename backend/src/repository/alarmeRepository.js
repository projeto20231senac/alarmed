import { con } from './connection.js'

export async function buscarDetalhesAlarmePorId(alarme_id, horarios_id){
    const comando = `
        SELECT a.alarme_nome, a.alarme_recorrencia, a.alarme_foto, a.count_disparos, m.medicamentos_dose, m.medicamentos_posologia, m.medicamentos_tipo, h.hora
        FROM alarmes AS a
        INNER JOIN medicamentos AS m ON a.alarme_id = m.alarme_id
        INNER JOIN horarios AS h ON a.alarme_id = h.alarmes_id
        WHERE a.alarme_id = ? AND h.horarios_id = ?`
    const [resposta] = await con.query(comando, [alarme_id, horarios_id])
    return resposta
}

export async function buscarDetalhesAlarmePorId(id){
    const comando = `
        SELECT a.alarme_nome, a.alarme_recorrencia, a.alarme_foto, a.count_disparos, m.medicamentos_dose, m.medicamentos_posologia, m.medicamentos_tipo
        FROM alarmes AS a
        INNER JOIN medicamentos AS m ON a.alarme_id = m.alarme_id
        WHERE a.alarme_id = ?`
    const [resposta] = await con.query(comando, [id])
    return resposta
}

export async function inserirAlarme(alarm) {
    const comando = `INSERT INTO alarmes (user_id,alarme_nome,alarme_recorrencia,alarme_hora,alarme_foto) VALUES (?,?,?,?,?)`;

    const [resposta] = await con.query(comando, [alarm.id, alarm.nome, alarm.recorrencia, alarm.hora, alarm.foto]);
    alarm.id = resposta.inserirAlarme
    return filme
}

export async function alterarImagem(foto, id) {
    const comando = `UPDATE alarmes SET alarme_foto =? WHERE alarme_id = ? `;
    const [resposta] = await con.query(comando, [foto, id]);
    return resposta.affectedRows;
}

export async function listarTodosAlarmes() {
    const comando = `SELECT  user_id                id,
                            alarme_nome             nome,
                            alarme_recorrencia      recorrencia,
                            alarme_hora             hora,
                            alarme_foto             foto
                        FROM alarmes`

    const [linhas] = await con.query(comando)
    return linhas
}
export async function alarmePorId(id) {
    const comando = `SELECT a.alarme_nome, a.alarme_recorrencia, a.alarme_id, h.horarios_id, h.hora
    FROM alarmes AS a
    INNER JOIN horarios AS h ON a.alarme_id = h.alarmes_id
    WHERE a.user_id = ?;`;
    
    const [result] = await con.query(comando, [id]);

    return result;
}

export async function alterarAlarme(id, alarme) {
    const comando = `UPDATE alarmes SET  alarme_nome =? , alarme_hora =? ,alarme_foto=? WHERE alarme_id=?  `
    const [resposta] = await con.query(comando, [alarme.nome, alarme.hora, alarme.foto, id])
    return resposta.affectedRows
}

export async function alterarUsuario(id, updatedData) {
    const { user_cep, user_dtnascimento } = updatedData;
    const comando = `UPDATE usuarios SET user_cep = ? , user_dtnascimento = ? WHERE user_id = ?`;
    const [resposta] = await con.query(comando, [user_cep, user_dtnascimento, id]);
    return resposta.affectedRows;
}

export async function removerAlarme(id) {
    const comando = `DELETE FROM alarmes WHERE alarme_id=?`
    const [resposta] = await con.query(comando, [id])
    return resposta.affectedRows
}