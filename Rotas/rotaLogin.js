import { Router } from "express";
import { autenticar } from "../Seguranca/autenticacao";

const rotaLogin = new Router();


rotaLogin
.post('/'), (req, res) =>{ autenticar(req, res) }