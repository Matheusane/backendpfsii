import Marca from "../Modelo/marca.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class MarcaDAO{
    async gravar(marca){
        if (marca instanceof Marca){
            const sql = "INSERT INTO marca(mar_nome) VALUES(?)"; 
            const parametros = [marca.nome];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            marca.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(marca){
        if (marca instanceof Marca){
            const sql = "UPDATE marca SET mar_nome = ? WHERE mar_codigo = ?"; 
            const parametros = [marca.nome, marca.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(marca){
        if (marca instanceof Marca){
            const sql = "DELETE FROM marca WHERE mar_codigo = ?"; 
            const parametros = [marca.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código da marca
            sql='SELECT * FROM marca WHERE mar_codigo = ? order by mar_nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela nome
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM marca WHERE mar_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaMarcas = [];
        for (const registro of registros){
            const marca = new Marca(registro.mar_codigo,registro.mar_nome);
            listaMarcas.push(marca);
        }
        return listaMarcas;
    }
}