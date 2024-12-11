<?php
session_start(); // Iniciar a Sessão
//Limpar o buffer de redirecionamento
ob_start();

if(isset($_SESSION['msg'])){
    // imprimir o valor da variavel global 'msg'
    echo $_SESSION['msg'];
    // Destruir a variavel global 'msg'
    unset($_SESSION['msg']);
}
include('conexao.php');
$dados=filter_input_array(INPUT_POST,FILTER_DEFAULT);
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $query="SELECT idusuario, nome, email, senha, tipo FROM usuario WHERE email=:email LIMIT 1";
    // Preparar a Query
    $result = $conexao->prepare($query);
    // Substiui o link ":email" pelo valor que vem do formulário
    $result->bindParam(':email',$dados['email']);

    $result->execute();
    

    // Acessa o IF quando encontrou o usuário no BD
    if(($result) and ($result->rowCount()!=0)){
        $row_usuario=$result->fetch(PDO::FETCH_ASSOC);
        //var_dump($row_usuario);
        // verificar se a senha digitada no formulário é igual a senha salva no banco de dados
        if(password_verify($dados['senha'],$row_usuario['senha'])){
            // o JWT é dividido em 3 partes separadas por '.', um header, um payload e uma signature

            // Header indica o tipo do token "JWT", e o algoritmo utilizado "HS256"
            $header=[
                'alg'=>'HS256',
                'typ'=>'JWT'
            ];
            //converter o array em objeto
            $header= json_encode($header);
            //var_dump($header);
            //codificar dados em base64
            $header= base64_encode($header);                
            // imprimir o header
            //var_dump($header);

            //o Payload é o corpo do JWT, recebe as informações que precisa armazenar
            // iss- o dominio da aplicação que gera o token
            // aud - define o dominio que pode usar o token
            // iat - Data de Criação do Token
            // exp - Data de vencimento do token
            $criado=time();
            $duracao=time()+(60*60*24*365);
            $payload=[
                'iss'=>'localhost',
                'aud'=>'localhost',
                'iat'=>$criado,
                'exp'=>$duracao,
                'id'=>$row_usuario['idusuario'],
                'nome'=>$row_usuario['nome'],
                'email'=>$row_usuario['email'],
                'tipo'=>$row_usuario['tipo']
            ];
            //converter o array em objeto
            $payload= json_encode($payload);
            //var_dump($payload);
            //codificar dados em base64
            $payload= base64_encode($payload);                
            // imprimir o payload
            //var_dump($payload);

            //O Signature é a assinatura
            //Chave secreta é unica
            $key='T1kTU9Tc5DpRM6QTUhCl8';

            //Pegar o header, payload e codificar com o algoritmo hs256, junto com a chave
            $signature=hash_hmac('sha256',"$header.$payload",$key,true);
            //codificar dados em base64
            $signature= base64_encode($signature);                
            // imprimir o signature
            //var_dump($signature);

            //Imprimir o token
            //echo "Token:<br> $header.$payload.$signature";

            //Salvar o Token em cookies
            // Cria o cookies com duração de 7 dias
            setCookie('accountholder',"$header.$payload.$signature",(time()+(60*60*24*365)));

            //Redireciona o usuário para a pagina index.html
            http_response_code(200);
            
        }else{
            http_response_code(401);
            // Criar mensagem de erro e atribuir para variavel global "msg"
            $_SESSION['msg']="<p style='color: #f00;'>Erro: Usuário ou Senha Invalida<p>";
        }
    }else{
        http_response_code(401);
        // Criar mensagem de erro e atribuir para variavel global "msg"
        $_SESSION['msg']="<p style='color: #f00;'>Erro: Usuário ou Senha Invalida<p>";
    }
}


?>