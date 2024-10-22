const socket = io();

function emitirDadosCadastro(dados){
    socket.emit("cadastra_usuario", dados);
}

socket.on("cadastro_sucesso" ,() => alert(" Cadastrado com sucesso!"));
socket.on("cadastro_negado", () => alert(" Erro no cadastro."));
socket.on("usuario_existente", () => alert("O usuário já existe!"));

export { emitirDadosCadastro };