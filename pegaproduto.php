<?php
include 'conexao.php';

if (isset($_GET['nome'])) {
    $nome = $_GET['nome'];

    // Consulta SQL com JOIN para obter informações do produto e o nome da categoria
    $stmt = $conexao->prepare("
        SELECT 
            p.idproduto, p.nome, p.preco, p.descricao, p.ingredientes, p.usar, p.ocasiao, p.imagem, c.nome AS categoria_nome, p.idcategoria
        FROM 
            produto p
        JOIN 
            categoria c ON p.idcategoria = c.idcategoria
        WHERE 
            p.nome LIKE :nome
        LIMIT 10
    ");
    $stmt->execute([':nome' => "%$nome%"]);

    // Exibe os resultados
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
} else {
    echo "<p>Parâmetro de busca não especificado.</p>";
}
?>
