<?php
header('Content-Type: application/json');


// Conexão com o banco de dados
require_once 'conexao.php';

$data = json_decode(file_get_contents('php://input'), true);

// Valida os dados recebidos
if (!isset($data['idproduto'], $data['quantidade'], $data['idusuario'])) {
    echo json_encode(['status' => 'error', 'message' => 'Dados incompletos.']);
    exit;
}

$idproduto = (int)$data['idproduto'];
$quantidade = (int)$data['quantidade'];
$idusuario = (int)$data['idusuario'];

// Insere ou atualiza o produto no carrinho
try {
    $sql2="SELECT * FROM carrinho WHERE idproduto = :idproduto AND idusuario = :idusuario";
    $stmt2= $conexao->prepare($sql2);
    $stmt2->bindParam(":idproduto",$idproduto,PDO::PARAM_INT);
    $stmt2->bindParam(":idusuario",$idusuario,PDO::PARAM_INT);
    $stmt2->execute();
    $resultado = $stmt2->fetch(PDO::FETCH_ASSOC);
    if(!empty($resultado)){
        $sql3="UPDATE carrinho 
        SET quantidade = quantidade + :quantidade 
        WHERE idproduto = :idproduto 
        AND idusuario = :idusuario";
        $stmt3 = $conexao->prepare($sql3);
        $stmt3->bindParam(':idusuario', $idusuario, PDO::PARAM_INT);
        $stmt3->bindParam(':idproduto', $idproduto, PDO::PARAM_INT);
        $stmt3->bindParam(":quantidade",$quantidade,PDO::PARAM_INT);
        $stmt3->execute();
        if ($stmt3->rowCount() > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Produto adicionado ao carrinho.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Nenhuma alteração foi feita.']);
        }
    }else{
        $sql = "INSERT INTO carrinho (idproduto, idusuario, quantidade)
        VALUES (:idproduto, :idusuario, :quantidade)";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(':idusuario', $idusuario, PDO::PARAM_INT);
        $stmt->bindParam(':idproduto', $idproduto, PDO::PARAM_INT);
        $stmt->bindParam(':quantidade', $quantidade, PDO::PARAM_INT);    
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Produto adicionado ao carrinho.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Nenhuma alteração foi feita.']);
        }
    }
    
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao adicionar ao carrinho: '.$e->getMessage()]);
}

$conexao=null;
?>