<?php
    include 'conexao.php'; 
    
    if(isset($_GET['idusuario'])) {
        $idusuario = $_GET['idusuario'];
        
        $stmt = $conexao->prepare(
            'SELECT pe.idpedido, pe.total, pe.data_pedido, ip.idproduto, ip.quantidade, ip.preco, ip.total AS total_item, p.nome, p.imagem
            FROM pedido pe
            JOIN itens_pedido ip ON pe.idpedido = ip.idpedido
            JOIN produto p ON ip.idproduto = p.idproduto  
            WHERE pe.idusuario LIKE :idusuario'
        );
        $stmt -> execute([':idusuario' => "%$idusuario%"]);

        echo '[';
    $first = true;
    while($row_pedidos = $stmt->fetch(PDO::FETCH_ASSOC)){
        if(!$first){
            echo ',';
        }
        $first = false;
        echo json_encode([
            'idpedido' => $row_pedidos['idpedido'],
            'data' => $row_pedidos['data_pedido'],
            'idproduto' => $row_pedidos['idproduto'],
            'quantidade' => $row_pedidos['quantidade'],
            'preco' => $row_pedidos['preco'],
            'subtotal' => $row_pedidos['total_item'],
            'total' => $row_pedidos['total'],
            'nome_produto' => $row_pedidos['nome'],
            'imagem' => $row_pedidos['imagem']
        ]);
    }
    echo ']';
} else {
    echo "<p>Parâmetro de busca não especificado.</p>";
    }
?>