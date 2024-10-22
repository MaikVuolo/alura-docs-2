import { MongoClient } from "mongodb";

const cliente = new MongoClient(
 "mongodb+srv://maikvuolo:maikvuolo123@cluster0.a7pgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

let documentosColecao,usuariosColecao;

try {
  await cliente.connect();

    const dataBase = cliente.db("cursoWebSocket");
    documentosColecao = dataBase.collection("socket");
    usuariosColecao = dataBase.collection("usuarios");

    console.log("Conexão com o bando de dados feita com sucesso");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao, usuariosColecao };
