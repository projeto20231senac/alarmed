import { con } from './connection.js'

export async function inserirUsuario(cpf, cep, dataNascimento) {
    const sql = `INSERT INTO usuarios (cpf, cep, dataNascimento) VALUES (?, ?, ?)`;
    const [resposta] = await con.query(sql, [cpf, cep, dataNascimento]);
    console.log(resposta);
    return resposta;
  }

  
export async function buscarUserPorId(id){
    const comando = `SELECT * FROM usuarios WHERE user_id = ?`
    const [resposta] = await con.query(comando, [id])
    return resposta
}

  export async function listarTodosUsuario() {
    const comando = `SELECT    *
                        FROM usuarios`

    const [linhas] = await con.query(comando)
    return linhas
}
export async function buscarUserPorCep(cep){
    const comando = `SELECT * FROM usuarios WHERE cep= ?`
    const [resposta] = await con.query(comando, [cep])
    return resposta[0]
}

export async function alterarUsuario(id, updatedData) {
    const { user_cep, user_dtnascimento } = updatedData;
    const comando = `UPDATE usuarios SET user_cep = ? , user_dtnascimento = ? WHERE user_id = ?`;
    const [resposta] = await con.query(comando, [user_cep, user_dtnascimento, id]);
    return resposta.affectedRows;
}
