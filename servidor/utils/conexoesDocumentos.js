const conexaoDocumento = [];

function encontrarConexao(nomeDocumento,nomeUsuario){
    return conexaoDocumento.find((conexao) => { 
        return (conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario)});
    
}

function listaConexaoUsuarioDocumento(conexao){
    conexaoDocumento.push(conexao)
    
}

function usuariosConexao(nomeDocumento){
    return conexaoDocumento
    .filter((cadaConexaoDaLista) => cadaConexaoDaLista.nomeDocumento === nomeDocumento)
    .map((cadaUsuarioFiltrado) => cadaUsuarioFiltrado.nomeUsuario )
}

function removerConexaoDocumento(nomeDocumento,nomeUsuario){
    const index = conexaoDocumento.findIndex((conexao) => { return conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario});

    if(index !== -1){
        conexaoDocumento.splice(index, 1);
    }
    
}

export {encontrarConexao ,listaConexaoUsuarioDocumento, usuariosConexao, removerConexaoDocumento };