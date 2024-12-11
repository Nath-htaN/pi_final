<?php
    include 'conexao.php'; 
    
    if(isset($_GET['idusuario'])) {
        $idusuario = $_GET['idusuario'];
        
        $stmt = $conexao->prepare(
            'SELECT c.idcarrinho, p.nome, p.preco, c.quantidade, p.imagem, p.idproduto,
            FORMAT(c.quantidade * p.preco, 2) AS subtotal 
            FROM carrinho c 
            JOIN produto p ON c.idproduto = p.idproduto 
            WHERE c.idusuario LIKE :idusuario'
        );
        $stmt -> execute([':idusuario' => "%$idusuario%"]);

        echo '[';
    $first = true;
    while($row_produto = $stmt->fetch(PDO::FETCH_ASSOC)){
        if(!$first){
            echo ',';
        }
        $first = false;
        echo json_encode([
            'idcarrinho' => $row_produto['idcarrinho'],
            'idproduto' => $row_produto['idproduto'],
            'nome' => $row_produto['nome'],
            'preco' => $row_produto['preco'],
            'imagem' => $row_produto['imagem'],
            'quantidade' => $row_produto['quantidade'],
            'subtotal' => $row_produto['subtotal']
        ]);
    }
    echo ']';
} else {
    echo "<p>Parâmetro de busca não especificado.</p>";
    }
?>