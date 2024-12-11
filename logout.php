<?php
session_start(); //Iniciar a Sessão
//Deletar o Cookie
setcookie('token');
// Criar a mensagem de sucesso
// $_SESSION['msg'] = "<p style='color: green;'>Deslogado com Sucesso!</ p>";
//Redirecionar o usuário para o arquivo index.php
// header("Location: index.php");
?>