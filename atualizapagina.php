<?php
include 'conexao.php';

if(isset($_GET['id'])){
    $idproduto = $_GET['id'];
    try{
        $sql= "SELECT * FROM produto WHERE idproduto = :idproduto";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(':idproduto', $idproduto, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0){
            $produto = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($produto);
        } else {
            echo json_encode(['error' => 'Produto não encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Erro na cunsulta' . $e]);
    }
} else {
    echo json_encode(['erro' => 'ID do produto não informado']);
}

?>