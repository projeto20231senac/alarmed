import { con } from './connection.js'


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
    const comando = `SELECT  user_id                id,
    alarme_nome             nome,
    alarme_recorrencia      recorrencia,
    alarme_hora             hora,
    alarme_foto             foto
FROM alarmes`
    const [linhas] = await con.query(comando, [id])
    return linhas[0]
}


export async function alterarAlarme(id, alarme) {
    const comando = `UPDATE alarmes SET  alarme_nome =? , alarme_hora =? ,alarme_foto=? WHERE alarme_id=?  `
    const [resposta] = await con.query(comando, [alarme.nome, alarme.hora, alarme.foto, id])
    return resposta.affectedRows
}
export async function removerAlarme(id) {
    const comando = `DELETE FROM alarmes WHERE alarme_id=?`
    const [resposta] = await con.query(comando, [id])
    return resposta.affectedRows
}