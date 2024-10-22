import criptoSenha from "../utils/criptoSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function cadastraUsuario({usuario, senha}){
   const { hashSenha, salSenha} = criptoSenha(senha);
    return usuariosColecao.insertOne({usuario, hashSenha, salSenha})
}

function encontrarUsuario({usuario}) {
    const buscaUsuario = usuariosColecao.findOne({
      usuario
    });
  
    return buscaUsuario;
  }

export { cadastraUsuario,encontrarUsuario };