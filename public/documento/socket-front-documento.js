import { obterCookie } from "../utils/cookie.js";
import { alertarERedirecionar, atualizarInterfaceDocumento, atualizaTextoEditor, tratarAutorizacaoSucesso } from "./documento.js";

const socket = io("/usuario",{
  auth:{
    token: obterCookie("tokenJwt"),
  },
});


socket.on("autorizacao_sucesso",tratarAutorizacaoSucesso)

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/index.html";
});

function selecionarDocumento(dadosEntrada) {
  socket.emit("selecionar_documento", dadosEntrada, (texto) => {
    atualizaTextoEditor(texto);
  });
}

socket.on("usuario_ja_no_documento", () => {
  alert("Já existe uma aba aberta neste documento");
  window.location.href = "/"
});


socket.on("conectados_no_documento",atualizarInterfaceDocumento);

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
