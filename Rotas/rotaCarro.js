import { Router } from "express";
import carroCtrl from "../Controle/carroCtrl.js";

const prodCtrl = new carroCtrl();
const rotaCarro = new Router();

rotaCarro
.get('/', prodCtrl.consultar)
.get('/:termo', prodCtrl.consultar)
.post('/', prodCtrl.gravar)
.patch('/', prodCtrl.atualizar)
.put('/', prodCtrl.atualizar)
.delete('/', prodCtrl.excluir);

export default rotaCarro;