import MarcaDAO from "../Persistencia/marcaDAO.js";
//não esqueça do .js no final da importação

export default class Marca {
    //definição dos atributos privados
    #codigo;
    #nome;

    constructor(codigo=0, nome=''){
        this.#codigo=codigo;
        this.#nome=nome;
    }

    //métodos de acesso públicos

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
        this.#nome = novaDesc;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            nome:this.#nome
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const catDAO = new MarcaDAO();
        await catDAO.gravar(this);
    }

    async excluir(){
        const catDAO = new MarcaDAO();
        await catDAO.excluir(this);
    }

    async atualizar(){
        const catDAO = new MarcaDAO();
        await catDAO.atualizar(this);

    }

    async consultar(parametro){
        const catDAO = new MarcaDAO();
        return await catDAO.consultar(parametro);
    }
}