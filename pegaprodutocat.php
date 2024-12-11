<?php
    include('conexao.php');
    if (isset($_GET['id'])) {
        $idcategoria = $_GET['id'];
        $sql="SELECT idproduto, nome, preco, imagem FROM produto WHERE idcategoria = :idcategoria";
        $stmt = $conexao->prepare($sql);
        $stmt ->bindParam('idcategoria', $idcategoria, PDO::PARAM_INT);
        $stmt -> execute();
    
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