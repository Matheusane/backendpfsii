import { Router } from "express";
import MarcaCtrl from "../Controle/marcaCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const catCtrl = new MarcaCtrl();
const rotaMarca = new Router();

rotaMarca
.get('/',catCtrl.consultar)
.get('/:termo', catCtrl.consultar)
.post('/',catCtrl.gravar)
.patch('/',catCtrl.atualizar)
.put('/',catCtrl.atualizar)
.delete('/',catCtrl.excluir);

export default rotaMarca;