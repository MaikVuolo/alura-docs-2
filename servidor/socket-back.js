
import registraEventosCadastro from "./registraEventos/cadastro.js";
import registraEventosDocumentos from "./registraEventos/documentos.js";
import registraEventosInicio from "./registraEventos/inicio.js";
import io from "./servidor.js";

io.on("connection", (socket) => {

  registraEventosInicio(socket,io);

  registraEventosDocumentos(socket,io);

  registraEventosCadastro (socket,io);
});
