<?php
    header('Content-Type: application/json');
    include 'conexao.php';
    $idproduto= $_POST['idproduto'];
    $sql = "INSERT INTO lixeira SELECT * FROM produto WHERE idproduto = :idproduto";
    $stmt = $conexao->prepare($sql);
    $stmt->bindParam(':idproduto',$idproduto);
    if ($stmt->execute()){
        $sql = "DELETE FROM produto WHERE idproduto = :idproduto";
        $stmt = $conexao ->prepare($sql);
        $stmt->bindParam(':idproduto',$idproduto);
        if ($stmt->execute()){
            echo "Produto excluido com sucesso!";
        } else{
            echo "Erro ao excluir o produto";
        }
    }
?>