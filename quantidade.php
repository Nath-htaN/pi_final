<?php
header('Content-Type: application/json');


// Conexão com o banco de dados
require_once 'conexao.php';

$data = json_decode(file_get_contents('php://input'), true);

// Valida os dados recebidos
if (!isset($data['idcarrinho'], $data['quantidade'],)) {
    echo json_encode(['status' => 'error', 'message' => 'Dados incompletos.']);
    exit;
}
$idcarrinho = (int)$data['idcarrinho'];
$quantidade = (int)$data['quantidade'];
try {
    if($quantidade>=1){
        $sql="UPDATE carrinho SET quantidade = :quantidade WHERE idcarrinho = :idcarrinho;";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(':idcarrinho', $idcarrinho, PDO::PARAM_INT);
        $stmt->bindParam(':quantidade', $quantidade, PDO::PARAM_INT);    
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Quantidade aumentada no carrinho.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Nenhuma alteração foi feita.']);
        }
    }else if($quantidade==0){
        $sql="DELETE FROM carrinho WHERE idcarrinho = :idcarrinho;";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(':idcarrinho', $idcarrinho, PDO::PARAM_INT);
        $stmt->execute();
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ocorreu o seguinte erro ao adicionar a quantidade: ' .$e]);
}
$conexao=null;
?>