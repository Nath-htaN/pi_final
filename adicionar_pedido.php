<?php
header('Content-Type: application/json');


// Conexão com o banco de dados
require_once 'conexao.php';

$data = json_decode(file_get_contents('php://input'), true);


/*if (!isset($data['idproduto'], $data['quantidade'], $data['preco'], $data['subtotal'], $data['total'], $data['idusuario'])) {
    echo json_encode(['status' => 'error', 'message' => 'Dados incompletos.']);
    exit;
}*/

$idusuario = (int)$data['idusuario'];
$total = (float)$data['total'];

try {
    // Iniciar uma transação para garantir consistência
    $conexao->beginTransaction();

    $stmtPedido = $conexao->prepare("INSERT INTO pedido (idusuario, total) 
    VALUES (:idusuario, :total)");
    $stmtPedido->execute([
    ':idusuario' => $idusuario,
    ':total' => $total,
    ]);
    $idpedido = $conexao->lastInsertId();

    // Inserir cada item do pedido na tabela "itens_pedido"
    $stmtItem = $conexao->prepare("INSERT INTO itens_pedido (idpedido, idproduto, quantidade, preco, total) 
                               VALUES (:idpedido, :idproduto, :quantidade, :preco, :total)");
                               
   $stmtCarrinho = $conexao->prepare("DELETE FROM carrinho 
                                    WHERE idcarrinho = :idcarrinho");
    foreach ($data['produtos'] as $produto) {
        $stmtItem->execute([
            ':idpedido' => $idpedido,
            ':idproduto' => (int)$produto['idproduto'],
            ':quantidade' => (int)$produto['quantidade'],
            ':preco' => (float)$produto['preco'],
            ':total' => (float)$produto['subtotal']
        ]);
        $idcarrinho=$produto['idcarrinho'];
        $stmtCarrinho->execute([":idcarrinho"=>$idcarrinho]);
    }
    
    $conexao->commit();   
    echo json_encode(['status' => 'success', 'message' => "Pedido criado"]);
    } catch (PDOException $e) {
        $conexao->rollBack();
        echo json_encode(['status' => 'error', 'message' => "Erro ao registrar o pedido" . $e->getMessage()]);
    }



?>