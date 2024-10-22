import { cadastraUsuario, encontrarUsuario } from "../db/usuariosDb.js";

function registraEventosCadastro ( socket, io){
    socket.on("cadastra_usuario", async(dados)=>{
        const usuario = await encontrarUsuario (dados)
        if(usuario === null){
            const resultado = await cadastraUsuario(dados);
    
            if(resultado.acknowledged){
                socket.emit("cadastro_sucesso", dados);
            }else{
                socket.emit("cadastro_negado", dados);
            }
        }else{
            socket.emit("usuario_existente",dados);
        }

    })
}

export default registraEventosCadastro;