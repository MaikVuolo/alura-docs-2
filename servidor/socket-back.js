import "dotenv/config";

import registraEventosCadastro from "./registraEventos/cadastro.js";
import registraEventosDocumentos from "./registraEventos/documentos.js";
import registraEventosInicio from "./registraEventos/inicio.js";
import registraEventosLogin from "./registraEventos/login.js";

import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspcUsuario = io.of("/usuario");

nspcUsuario.use(autorizarUsuario);

nspcUsuario.on("connection", (socket) => {

  registraEventosInicio(socket,nspcUsuario);

  registraEventosDocumentos(socket,nspcUsuario);
  
});

io.of("/").on("connection", (socket) => {

  registraEventosCadastro (socket,io);

  registraEventosLogin (socket, io);
});
