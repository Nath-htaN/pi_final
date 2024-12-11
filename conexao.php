<?php
    $host= 'localhost';
    $usuario = 'root';
    $senha = 'Senac@2024';
    $dbname = 'rpavan';

    try{
        $conexao = new PDO("mysql:host=$host;dbname=$dbname",$usuario,$senha);
        $conexao -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        $e ->getMessage();
    }
?>