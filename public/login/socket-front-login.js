const socket = io();

function autenticarCadastro(dados){
    socket.emit("autentica_cadastro",dados );
}

socket.on("cadastro_autenticado_sucesso", () => { 
    alert("Sucesso no login!");
    window.location.href = "/";
});
socket.on("falha_autenticacao", () => alert("Falha no login!"));
socket.on("usuario_nao_encontrado", () => alert("usuario não encontrado"));

export { autenticarCadastro };