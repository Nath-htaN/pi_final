<?php
    include('conexao.php');
    $sql="SELECT idproduto, nome, preco, imagem FROM produto";
    $stmt = $conexao->prepare($sql);
    $stmt -> execute();
    echo '[';
    $first = true;
    while($row_produto = $stmt->fetch(PDO::FETCH_ASSOC)){
        if(!$first){
            echo ',';
        }
        $first = false;
        echo json_encode([
            'idproduto' => $row_produto['idproduto'],
            'nome' => $row_produto['nome'],
            'preco' => $row_produto['preco'],
            'imagem' => $row_produto['imagem']
        ]);
    }
    echo ']';
?>