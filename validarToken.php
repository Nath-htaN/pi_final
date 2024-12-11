<?php
include('conexao.php');
header('Content-Type: application/json');
function validarToken()
{
    if (!isset($_COOKIE['accountholder'])) {
        return false;
    }
    //Recuperar o Token do cookie
    $token = $_COOKIE['accountholder'];
    //var_dump($token);
    //Converter o Token em Array
    $token_array = explode('.', $token);
    //var_dump($token_array);
    $header = $token_array[0];
    $payload = $token_array[1];
    $signature = $token_array[2];

    //Chave secreta é unica
    $key = 'T1kTU9Tc5DpRM6QTUhCl8';

    //Usar o header e o payload e codificar com o algoritmo sha256;
    $validar_assinatura=hash_hmac('sha256',"$header.$payload",$key,true);

    //Codificar dados em base64
    $validar_assinatura=base64_encode($validar_assinatura);
    // Comparar a assinatura do token recebido com a assinatura gerada
    // Acessa o IF quando o token é valido
    if($signature==$validar_assinatura){
        //decodificar dados de base64
        $dados_token=base64_decode($payload);
        //converter objeto em array
        $dados_token=json_decode($dados_token);
        //var_dump($dados_token);
        //comparar a data de vencimento do token com a data atual
        //acessa o IF quando a data do token é maior que a data atual(aparentemente é inutil)
        if($dados_token->exp >time()){
            //Retorna TRUE indicando que o token é ialido
            return true;
        }else{
            //Acessa o ELSE quando a data do token é menor ou igual a data atual
            //Retorna FALSE indicando que o token é invalido
            return false;
        }
    }else{
        //Acessa o ELSE quando o token é invalido
        // Retorna FALSE indicando que é invalido
        return false;
    }
    
}
echo json_encode(['valid' => validarToken()]);

?>