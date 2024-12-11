<?php
include('conexao.php');

try {
    $stmt = $conexao->prepare("SELECT idcategoria, nome FROM categoria");
    $stmt->execute();
    $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json');
    echo json_encode($categorias);
} catch (PDOException $e) {
    echo json_encode(["erro" => "Erro ao buscar categorias: " . $e->getMessage()]);
}
?>