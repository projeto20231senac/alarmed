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

export async function inserirAlarme(alarme, cpf) {
    const comando = `INSERT INTO alarmes (cpf, alarme_nome) VALUES (?,?)`;
    const [resposta] = await con.query(comando, [cpf, alarme]);
    return { alarme_id: resposta.insertId }
}

export async function inserirHorarios(cpfNovoAlarme, novoAlarmeId, novoMedicamentosId, horarios) {
    // Transforma horarios em uma array se não for uma
    const horariosArray = Array.isArray(horarios) ? horarios : [horarios];

    // Verifica se horariosArray é uma array antes de tentar iterar sobre ela
    if (!Array.isArray(horariosArray) || horariosArray.length === 0) {
        throw new Error("A array de horários é inválida ou vazia.");
    }

    const comando = `INSERT INTO horarios (cpf, medicamentos_id, alarme_id, hora) VALUES ?`;
    const valoresInsercao = [];

    console.log("No repository: ", horariosArray);
    for (const horario of horariosArray) {
        valoresInsercao.push([cpfNovoAlarme, novoMedicamentosId, novoAlarmeId, horario]);
    }

    const [resposta] = await con.query(comando, [valoresInsercao]);

    return resposta;
}


export async function alterarImagem(foto, id) {
    const comando = `UPDATE alarmes SET alarme_foto =? WHERE alarme_id = ? `;
    const [resposta] = await con.query(comando, [foto, id]);
    console.log("OI",resposta);
    return resposta.affectedRows;
}

export async function listarTodosAlarmes() {
    const comando = `SELECT  cpf                cpf,
                            alarme_nome             nome,
                            alarme_recorrencia      recorrencia,
                            alarme_foto             foto
                        FROM alarmes`

    const [linhas] = await con.query(comando)
    return linhas
}

export async function alarmePorCpf(cpf) {
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const comando = `SELECT a.alarme_id, a.alarme_nome, a.alarme_recorrencia, a.alarme_id, a.alarme_foto,h.horarios_id, h.hora
    FROM alarmes AS a
    INNER JOIN horarios AS h ON a.alarme_id = h.alarme_id
    WHERE a.cpf = ?
    ORDER BY 
        CASE 
            WHEN h.hora > ? THEN 0  
            ELSE 1                              
        END,
        h.hora`
    
    const [result] = await con.query(comando, [cpf, horaAtual]);

    return result;
}

export async function promocoesPorCep(cep, alarmeNome, dataAtual = new Date()){
    const comando = `
        SELECT promocoes_cep, promocoes_medicamento, promocoes_preco, promocoes_inicio, promocoes_fim, promocoes_fornecedor, promocoes_fornecedor_telefone
        FROM promocoes 
        WHERE promocoes_cep = ? AND promocoes_medicamento = ? AND ? BETWEEN promocoes_inicio AND promocoes_fim`

        const [result] = await con.query(comando, [cep, alarmeNome, dataAtual]);

        return result;
}

export async function alterarTipoNovoAlarme(alarme_id, tipo, cpf){
    const comando = `INSERT INTO medicamentos (alarme_id, cpf, medicamentos_tipo) VALUES (?, ?, ?)`
    const [resposta] = await con.query(comando, [alarme_id, cpf, tipo])
    return { medicamentos_id: resposta.insertId };
}


export async function alterarMedicamento(novoMedicamentosId, novoAlarmeId, cpf, dose, unidade){
    const comando = `UPDATE medicamentos SET medicamentos_dose = ?, medicamentos_posologia = ? WHERE medicamentos_id = ? AND alarme_id = ? AND cpf = ?`
        const [resposta] = await con.query(comando, [dose, unidade, novoMedicamentosId, novoAlarmeId, cpf])
        return resposta
}

export async function alterarAlarme(alarme_id, horarios_id, alarme_nome, alarme_recorrencia, hora, medicamentos_tipo, medicamentos_dose, medicamentos_posologia) {
    const comando = `
        UPDATE alarmes a
            INNER JOIN
                horarios h ON a.alarme_id = h.alarme_id
            INNER JOIN
                medicamentos m ON a.alarme_id = m.alarme_id 
        SET 
            a.alarme_nome = ?,
            a.alarme_recorrencia = ?,
            h.hora = ?,
            m.medicamentos_tipo = ?,
            m.medicamentos_dose = ?,
            m.medicamentos_posologia = ?
        WHERE
            a.alarme_id = ? AND h.horarios_id = ?`
    
    const [resposta] = await con.query(comando, [alarme_nome, alarme_recorrencia, hora, medicamentos_tipo, medicamentos_dose, medicamentos_posologia, alarme_id, horarios_id]);
    
    return resposta.affectedRows;
}

export async function alterarRecorrencia(cpfNovoAlarme, novoAlarmeId, recorrencia) {
    const comando = `UPDATE alarmes SET alarme_recorrencia = ? WHERE cpf = ? AND alarme_id = ?`
    const [resposta] = await con.query(comando, [recorrencia, cpfNovoAlarme, novoAlarmeId])
    return resposta
}

export async function removerAlarme(alarme_id, horarios_id) {
    const comando = `DELETE FROM horarios WHERE alarme_id = ? AND horarios_id = ?`
    const [resposta] = await con.query(comando, [alarme_id, horarios_id])
    return resposta.affectedRows
}