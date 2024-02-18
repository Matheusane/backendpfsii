import Carro from '../Modelo/carro.js';
import Marca from '../Modelo/marca.js';
import conectar from './conexao.js';

export default class CarroDAO {

    async gravar(carro) {
        if (carro instanceof Carro) {
            const sql = `INSERT INTO carro(car_nome,
                car_valor, car_anoFabricacao, car_qtdEstoque, mar_codigo)
                VALUES(?,?,?,?,?,?)`;
            const parametros = [carro.nome, carro.valor,
            carro.anoFabricacao, carro.qtdEstoque, carro.marca.codigo];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            carro.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(carro) {
        if (carro instanceof Carro) {
            const sql = `UPDATE carro SET car_nome = ?,
            car_valor = ?, car_anoFabricacao = ?, car_qtdEstoque = ?, mar_codigo = ?
            WHERE car_codigo = ?`;
            const parametros = [carro.nome, carro.valor,
            carro.anoFabricacao, carro.qtdEstoque, carro.marca.codigo, carro.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(carro) {
        if (carro instanceof Carro) {
            const sql = `DELETE FROM carro WHERE car_codigo = ?`;
            const parametros = [carro.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaCarros = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do carro
            const sql = `SELECT c.car_codigo, c.car_nome,
              c.car_valor, c.car_anoFabricacao, 
              c.car_qtdEstoque, m.mar_codigo, m.mar_nome
              FROM carro c 
              INNER JOIN marca m ON c.mar_codigo = m.mar_codigo
              WHERE c.car_codigo = ?
              ORDER BY c.car_nome               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const marca = new Marca(registro.mar_codigo, registro.mar_nome);
                const carro = new Carro(registro.car_codigo,registro.car_nome,
                                            registro.car_valor,
                                            registro.car_anoFabricacao, registro.car_qtdEstoque,
                                            marca
                                            );
                listaCarros.push(carro);
            }
        }
        else
        {
            //consulta pela descrição do carro
            const sql = `SELECT c.car_codigo, c.car_nome,
              c.car_valor, c.car_anoFabricacao, 
              c.car_qtdEstoque, m.mar_codigo, m.mar_nome
              FROM carro c 
              INNER JOIN marca m ON c.mar_codigo = m.mar_codigo
              WHERE c.car_codigo = ?
              ORDER BY c.car_nome               
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const marca = new Marca(registro.mar_codigo, registro.mar_nome);
                const carro = new Carro(registro.car_codigo,registro.car_nome,
                                            registro.car_valor,
                                            registro.car_anoFabricacao, registro.car_qtdEstoque,
                                            marca
                                            );
                listaCarros.push(carro);
            }
        }

        return listaCarros;
    }
}