import express from 'express';
import cors from 'cors';
import rotaMarca from './Rotas/rotaMarca.js';
import rotaCarro from './Rotas/rotaCarro.js'
import rotaLogin from './Rotas/rotaLogin.js';
import dotenv from 'dotenv'
import session from 'express-session'
import { verificarAcesso } from './Seguranca/autenticacao.js';

const host='0.0.0.0';
const porta='3000';

dotenv.config()
console.log(process.env)


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 40
}))


app.use('/login',rotaLogin);
app.use('/marca',verificarAcesso, rotaMarca);
app.use('/carro',verificarAcesso, rotaCarro);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
