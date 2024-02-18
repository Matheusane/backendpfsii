import CarroDAO from "../Persistencia/carrroDAO.js";

export default class Carro{
    #codigo;
    #nome;
    #valor;
    #anoFabricacao;
    #qtdEstoque;
    #marca; //é um objeto do tipo marca

    constructor(codigo=0,nome="", valor=0,
                anoFabricacao='', qtdEstoque=0,
                marca={}
                ){
        this.#codigo=codigo;
        this.#nome=nome;
        this.#valor=valor;
        this.#anoFabricacao=anoFabricacao;
        this.#qtdEstoque=qtdEstoque;
        this.#marca=marca;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novaDesc){
        this.#nome=novaDesc;
    }

    get valor(){
        return this.#valor;
    }
    
    set valor(novoPreco){
        this.#valor = novoPreco
    }

    get anoFabricacao(){
        return this.#anoFabricacao;
    }

    set anoFabricacao(novaData){
        this.#anoFabricacao = novaData;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(novaQtd){
        this.#qtdEstoque = novaQtd;
    }

    get marca(){
        return this.#marca;
    }

    set marca(novaCat){
        this.#marca = novaCat;
    }

    //override do método toJSON
    toJSON(){
        return {
            codigo:this.#codigo,
            nome:this.#nome,
            valor:this.#valor,
            anoFabricacao:this.#anoFabricacao,
            qtdEstoque:this.#qtdEstoque,
            marca:this.#marca
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const prodDAO = new CarroDAO();
        await prodDAO.gravar(this);
     }
 
     async excluir(){
        const prodDAO = new CarroDAO();
        await prodDAO.excluir(this);
     }
 
     async alterar(){
        const prodDAO = new CarroDAO();
        await prodDAO.atualizar(this);
     }
 
     async consultar(termo){
        const prodDAO = new CarroDAO();
        return await prodDAO.consultar(termo);
     }

}