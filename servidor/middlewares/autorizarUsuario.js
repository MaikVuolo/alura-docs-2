import jwt from "jsonwebtoken";

function autorizarUsuario(socket, next) {
  const token = socket.handshake.auth.token;

  jwt.verify(token, process.env.SEGREDO_TOKEN, (erro, tokenJwt) => {
    if (!erro) {
      socket.emit("autorizacao_sucesso", tokenJwt);

      next();
    } else {
      next(erro);
    }
  });
}

  export default autorizarUsuario;