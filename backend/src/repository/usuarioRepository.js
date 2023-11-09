import { con } from './../repository/connection.js'

export async function inserirUsuario(usuario) {
  const sql = `INSERT INTO usuarios (cpf, user_cep, user_dtnascimento) VALUES (?, ?, ?)`;
  const [resposta] = await con.query(sql, [usuario.cpf, usuario.cep, usuario.dataNascimento]);
  return usuario;
}

export async function buscarUserPorCpf(cpf){
    const sql = `SELECT * FROM usuarios WHERE cpf= ?`
    const [resposta] = await con.query(sql, [cpf])
    return resposta[0]
}

export async function alterarUsuario(cpf, updatedData) {
    const comando = `UPDATE usuarios SET user_cep = ?, user_dtnascimento = ? WHERE cpf = ?`;
    const [resposta] = await con.query(comando, [updatedData.user_cep, updatedData.user_dtnascimento,cpf]);
    return resposta.affectedRows;
}



