<?php
function RecuperarIDToken(){
    //Recuperar o Token do cookie
    $token = $_COOKIE['accountholder'];
    //Converter o Token em Array
    $token_array = explode('.', $token);
    //var_dump($token_array);
    $payload = $token_array[1];
    //decodificar dados de base64
    $dados_token=base64_decode($payload);
    //converter objeto em array
    $dados_token=json_decode($dados_token);
    //var_dump($dados_token->nome);
    //Retorna o nome do usuário salvo no Token
    return $dados_token->id;
}
echo json_encode(['idusuario' => RecuperarIDToken()]);
?>