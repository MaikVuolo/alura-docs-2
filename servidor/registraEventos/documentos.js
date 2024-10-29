import {
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento,
  } from "../db/documentosDb.js";
import { encontrarConexao, listaConexaoUsuarioDocumento, removerConexaoDocumento, usuariosConexao } from "../utils/conexoesDocumentos.js";

function registraEventosDocumentos(socket,io ){
    socket.on("selecionar_documento", async ({nomeDocumento, nomeUsuario}, devolverTexto) => {
               
        const documento = await encontrarDocumento(nomeDocumento);
        
        if (documento) {

          const conexaoEncontrada = encontrarConexao(nomeDocumento,nomeUsuario);
          if (!conexaoEncontrada){

            socket.join(nomeDocumento);
  
            listaConexaoUsuarioDocumento({nomeDocumento,nomeUsuario});

            socket.data = {
              usuarioEntrou:true,
            }

            const listaUsuarios = usuariosConexao(nomeDocumento);
            io.to(nomeDocumento).emit("conectados_no_documento", listaUsuarios);
            
  
            devolverTexto(documento.texto);
          }else{
            socket.emit("usuario_ja_no_documento")
          }

        }
        socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
          const atualizacao = await atualizaDocumento(nomeDocumento, texto);
      
          if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
          }
        });
      
        socket.on("excluir_documento", async (nome) => {
          const resultado = await excluirDocumento(nome);
      
          if (resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", nome);
          }
        });

        socket.on("disconnect", () => {
          if(socket.data.usuarioEntrou){

            removerConexaoDocumento(nomeDocumento,nomeUsuario);
  
            const listaUsuarios = usuariosConexao(nomeDocumento);
            io.to(nomeDocumento).emit("conectados_no_documento", listaUsuarios);
          }
          
        });


      });
    
 
};

export default registraEventosDocumentos;