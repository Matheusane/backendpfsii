import { Router } from "express";
import carroCtrl from "../Controle/carroCtrl.js";

const carCtrl = new carroCtrl();
const rotaCarro = new Router();

rotaCarro
.get('/', carCtrl.consultar)
.get('/:termo', carCtrl.consultar)
.post('/', carCtrl.gravar)
.patch('/', carCtrl.atualizar)
.put('/', carCtrl.atualizar)
.delete('/', carCtrl.excluir);

export default rotaCarro;