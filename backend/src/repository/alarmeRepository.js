import { con } from './connection.js'

export async function buscarDetalhesAlarmePorId(alarme_id, horarios_id){
    const comando = `
        SELECT a.alarme_id, a.alarme_nome, a.alarme_recorrencia, a.alarme_foto, a.count_disparos, m.medicamentos_dose, m.medicamentos_posologia, m.medicamentos_tipo, h.hora
        FROM alarmes AS a
        INNER JOIN medicamentos AS m ON a.alarme_id = m.alarme_id
        INNER JOIN horarios AS h ON a.alarme_id = h.alarme_id
        WHERE a.alarme_id = ? AND h.horarios_id = ?`
    const [resposta] = await con.query(comando, [alarme_id, horarios_id])
    return resposta
}

export async function inserirAlarme(alarm) {
    const comando = `INSERT INTO alarmes (cpf,alarme_nome,alarme_recorrencia,alarme_hora,alarme_foto) VALUES (?,?,?,?,?)`;

    const [resposta] = await con.query(comando, [alarm.id, alarm.nome, alarm.recorrencia, alarm.hora, alarm.foto]);
    alarm.id = resposta.inserirAlarme
    return filme
}

export async function inserirMedicamento(nome) {
    const comando = `INSERT INTO medicamentos (alarme_id ,cpf,medicamentos_dose,medicamentos_posologia,medicamentos_tipo) VALUES (?,?,?,?,?)`;
    const [resposta] = await con.query(comando, [nome.idAlarme,nome.cpf,nome.dose,nome.posologia,nome.tipo]);
  console.log(nome);
    return nome
}
export async function inserirHorario(horario, cpf) {
    const comando = `INSERT INTO horarios (hora) VALUES (?) WHERE cpf = ?`;
    const [resposta] = await con.query(comando, [req.body.horario,req.body.cpf]);
  
    return horario
}

export async function alterarImagem(foto, id) {
    const comando = `UPDATE alarmes SET alarme_foto =? WHERE alarme_id = ? `;
    const [resposta] = await con.query(comando, [foto, id]);
    return resposta.affectedRows;
}

export async function listarTodosAlarmes() {
    const comando = `SELECT  cpf                id,
                            alarme_nome             nome,
                            alarme_recorrencia      recorrencia,
                            alarme_hora             hora,
                            alarme_foto             foto
                        FROM alarmes`

    const [linhas] = await con.query(comando)
    return linhas
}
export async function alarmePorCpf(cpf) {
    console.log(cpf)
    const comando = `SELECT a.alarme_id, a.alarme_nome, a.alarme_recorrencia, a.alarme_id, h.horarios_id, h.hora
    FROM alarmes AS a
    INNER JOIN horarios AS h ON a.alarme_id = h.alarme_id
    WHERE a.cpf = ?
    ORDER BY h.hora`;
    
    const [result] = await con.query(comando, [cpf]);

    return result;
}

export async function alterarAlarme(alarme_id, horarios_id, alarme_nome, alarme_recorrencia, hora, medicamentos_tipo, medicamentos_dose, medicamentos_posologia) {
    const comando = `
    UPDATE alarmes
    JOIN horarios ON alarme.alarme_id = horarios.alarme_id
    JOIN medicamentos ON alarme.alarme_id = medicamentos.alarme_id
    SET
      alarmes.alarme_nome = ?,
      alarmes.alarme_recorrencia = ?,
      horarios.hora = ?,
      medicamentos.medicamentos_tipo = ?,
      medicamentos.medicamentos_dose = ?,
      medicamentos.medicamentos_posologia = ?
    WHERE
      alarmes.alarme_id = ? AND horarios.horarios_id = ?`
    const [resposta] = await con.query(comando, [alarme_id, horarios_id, alarme_nome, alarme_recorrencia, hora, medicamentos_tipo, medicamentos_dose, medicamentos_posologia, alarme_id, horarios_id])
    return resposta.affectedRows
}

export async function removerAlarme(id) {
    const comando = `DELETE FROM alarmes WHERE alarme_id = ?`
    const [resposta] = await con.query(comando, [id])
    return resposta.affectedRows
}