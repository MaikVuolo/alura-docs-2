import { encontrarUsuario } from "../db/usuariosDb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarToken from "../utils/gerarJWT.js";

function registraEventosLogin (socket, io){
  socket.on("autentica_cadastro",async ({usuario, senha}) => {
    const usuarioEncontrado = await encontrarUsuario({usuario})

    if(usuarioEncontrado){
      const autenticar = autenticarUsuario(senha, usuarioEncontrado);
      
      if(autenticar){
        const tokenJwt = gerarToken({usuario})

        socket.emit("cadastro_autenticado_sucesso", tokenJwt);
      }else{
        socket.emit("falha_autenticacao");
      }
    }else{
      socket.emit("usuario_nao_encontrado");
    }



        
  })
}

export default registraEventosLogin;