<?php
header('Content-Type: application/json');
include 'conexao.php';
$acao = $_POST['acao'] ?? '';

if ($acao === 'buscar') {
    $nome = $_POST['nome'] ?? '';
    $stmt = $conexao->prepare("SELECT * FROM produto WHERE nome LIKE :nome LIMIT 1");
    $stmt->execute([':nome' => "%$nome%"]);
    $produto = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($produto) {
        echo json_encode(['sucesso' => true, 'produto' => $produto]);
    } else {
        echo json_encode(['sucesso' => false]);
    }

} elseif ($acao === 'atualizar') {
    $idproduto = $_POST['idproduto'];
    $nome = $_POST['nome'];
    $preco = $_POST['preco'];
    $descricao = $_POST['descricao'];
    $ingredientes = $_POST['ingredientes'];
    $usar = $_POST['usar'];
    $ocasiao = $_POST['ocasiao'];
    $idcategoria = $_POST['categoria'];
    $imagemCaminho = null;

    if (!empty($_FILES['imagem']['name'])) {
        $imagemNome = $_FILES['imagem']['name'];
        $imagemTemp = $_FILES['imagem']['tmp_name'];
        $imagemCaminho = 'img/' . $imagemNome;
        move_uploaded_file($imagemTemp, $imagemCaminho);
    }

    $sql = "UPDATE produto SET nome = :nome, preco = :preco, descricao = :descricao, ingredientes = :ingredientes, usar = :usar, ocasiao = :ocasiao, idcategoria = :idcategoria";
    
    if ($imagemCaminho) {
        $sql .= ", imagem = :imagem";
    }
    $sql .= " WHERE idproduto = :idproduto";

    $stmt = $conexao->prepare($sql);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':preco', $preco);
    $stmt->bindParam(':descricao', $descricao);
    $stmt->bindParam(':ingredientes', $ingredientes);
    $stmt->bindParam(':usar', $usar);
    $stmt->bindParam(':ocasiao', $ocasiao);
    $stmt->bindParam(':idcategoria', $idcategoria);
    $stmt->bindParam(':idproduto', $idproduto);
    
    if ($imagemCaminho) {
        $stmt->bindParam(':imagem', $imagemCaminho);
    }

    if ($stmt->execute()) {
        echo "Produto atualizado com sucesso!";
    } else {
        echo "Erro ao atualizar o produto.";
    }
}
?>