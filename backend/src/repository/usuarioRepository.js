import { con } from './../repository/connection.js'

export async function inserirUsuario(cpf, cep, dataNascimento) {
    const sql = `INSERT INTO usuarios (cpf, user_cep, user_dtnascimento) VALUES (?, ?, ?)`;
    const [resposta] = await con.query(sql, [cpf, cep, dataNascimento]);
    console.log(resposta);
    return resposta;
  }

  
export async function buscarUserPorCpf(cpf){
    const comando = `SELECT * FROM usuarios WHERE cpf = ?`
    const [resposta] = await con.query(comando, [cpf])
    return resposta
}

export async function buscarUserPorCep(cep){
    const comando = `SELECT * FROM usuarios WHERE user_cep= ?`
    const [resposta] = await con.query(comando, [cep])
    return resposta[0]
}

export async function alterarUsuario(cpf, updatedData) {
    const comando = `UPDATE usuarios SET user_cep = ?, user_dtnascimento = ? WHERE cpf = ?`;
    const [resposta] = await con.query(comando, [updatedData.user_cep, updatedData.user_dtnascimento,cpf]);
    return resposta.affectedRows;
}



