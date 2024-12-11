<?php
include 'conexao.php'; 

try {
    $stmt = $conexao->prepare("SELECT 
                pe.idpedido, 
                pe.data_pedido,
                u.nome AS cliente_nome,
                u.sobrenome as cliente_sobrenome,
                u.celular AS cliente_contato, 
                u.cep AS cliente_cep,
                pe.total AS pedido_total, 
                ip.idproduto, 
                p.nome AS produto_nome, 
                ip.quantidade, 
                ip.preco, 
                ip.total AS item_total
            FROM pedido pe
            INNER JOIN usuario u ON pe.idusuario = u.idusuario
            INNER JOIN itens_pedido ip ON pe.idpedido = ip.idpedido
            INNER JOIN produto p ON ip.idproduto = p.idproduto
            ORDER BY pe.idpedido DESC;
            ");
    $stmt->execute();
    $pedidos = [];
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
        $pedidoId = $row['idpedido'];
        if(!isset($pedidos[$pedidoId])){
            $pedidos[$pedidoId]=[
                'idpedido' => $pedidoId,
                'cliente_nome' => $row['cliente_nome'],
                'cliente_sobrenome' => $row['cliente_sobrenome'],
                'cliente_contato' => $row['cliente_contato'],
                'pedido_total' => $row['pedido_total'],
                'data_pedido' => $row['data_pedido'],
                'cliente_cep' => $row['cliente_cep'],
                'itens' => []
            ];
        }
        $pedidos[$pedidoId]['itens'][] = [
            'produto_nome' => $row['produto_nome'],
            'quantidade' => $row['quantidade'],
            'preco' => $row['preco'],
            'subtotal' => $row['item_total']
        ];
        
    }
    echo json_encode(array_values($pedidos));
}catch(PDOException $e){
    echo json_encode(['error' => $e->getMessage()]);
}
?>