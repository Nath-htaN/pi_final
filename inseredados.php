<?php
include('conexao.php');
if ($_SERVER["REQUEST_METHOD"]=="POST"){
    $nome = htmlspecialchars($_POST['nome']);
    $descricao = htmlspecialchars($_POST['descricao']);
    $ingredientes = htmlspecialchars($_POST['ingredientes']);
    $usar= htmlspecialchars($_POST['usar']);
    $ocasiao = htmlspecialchars($_POST['ocasiao']);
    $preco = (float) $_POST['preco'];
    $categoria = (int) $_POST['categoria'];
    echo $categoria;
    if(isset($_FILES['imagem']) && $_FILES['imagem']['error'] ==0 ){
        $nomeImagem = basename($_FILES['imagem']['name']);
        $caminhoImagem = "img/".$nomeImagem;
        if(move_uploaded_file($_FILES['imagem']['tmp_name'],$caminhoImagem)){
            try{
                $sql = "INSERT INTO produto (nome, preco, descricao, ingredientes, usar, ocasiao, imagem, idcategoria) VALUES (:nome, :preco, :descricao, :ingredientes, :usar, :ocasiao, :imagem, :idcategoria)";
                $stmt = $conexao->prepare($sql);
                $stmt->bindParam(':nome',$nome);
                $stmt->bindParam(':preco',$preco);
                $stmt->bindParam(':descricao',$descricao);
                $stmt->bindParam(':ingredientes',$ingredientes);
                $stmt->bindParam(':usar',$usar);
                $stmt->bindParam(':ocasiao',$ocasiao);
                $stmt->bindParam(':imagem',$caminhoImagem);
                $stmt->bindParam(':idcategoria',$categoria);

                if ($stmt->execute()){
                    echo "Produto inserido com sucesso!";
                     $idproduto = $conexao->lastInsertId();
                     $html_content = "
                     <!DOCTYPE html>
                     <html lang='pt-br'>
                     
                     <head>
                         <meta charset='UTF-8'>
                         <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                         <title>$nome</title>
                         <link rel='stylesheet' href='css/produtos.css'>
                     </head>
                     <body>
                         <header>
                             <div class='menu'>
                                 <div class='leftmenu'>
                                     <div class='logo'>
                                         <img src='img/rpavan2.svg' alt='Logo'>
                                     </div>
                                     <nav>
                                         <ul>
                                            <li><a href='index.html'>Home</a></li>
                                            <li><a href='perfumaria.html'>Perfumaria</a></li>
                                            <li><a href='aromas.html'>Aromas</a></li>
                                            <li><a href='infantil.html'>Infantil</a></li>
                                            <li><a href='masculino.html'>Masculino</a></li>
                                         </ul>
                                     </nav>
                                 </div>
                                 <div class='rightmenu'>
                                    <div class='pesquisa'>
                                        <input name='busca' id='search' placeholder='buscar' onkeyup='buscarProduto()'>
                                        <ul id='resultados'></ul>
                                    </div>
                                    <a href='carrinho.html' class='cart'><img src='img/sacola.svg' alt='Carrinho'></a>
                                    <div class='incon-avatar' onclick='abreomenu()'>
                                    <img src='img/user.svg'>
                                    </div>
                                    <div id='loginsubmenu' class='submenu'></div>
                                 </div>
                             </div>
                             <div class='linha'></div>
                         </header>
                         <main>
                             <section>
                                 <div class='pagina'>
                                     <div class='caixaesquerda'>
                                         <div class='items'>
                                             <div class='imagem-selecionada'>
                                                 <img src='' alt='$nome'>
                                             </div>
                                         </div>
                                     </div>
                                     <div class='idproduto' style='display: none;'>$idproduto</div>
                                     <div class='caixadireita'>
                                         <div class='borda'>
                                             <div class='conteudo'>
                                                 <h1></h1>
                                                 <p class='descrição'></p>
                                                 <span class='preco'></span>
                                                 <div class='opcoes'>
                                                     <div class='quantidade'>
                                                         <div class='menos'>
                                                             <img src='img/menor.svg' alt='Diminuir quantidade' onclick='removeQty()'>
                                                         </div>
                                                         <span class='qty'>1</span>
                                                         <div class='mais'>
                                                             <img src='img/maior.svg' alt='Aumentar quantidade' onclick='addQty()'>
                                                         </div>
                                                    </div> 
                                                     <a class='botão' onclick='addCarrinho()'><img src='img/sacola.svg' alt='Carrinho'>Adicionar ao carrinho</a>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <div class='pagina2'>
                                     <div class='caixabaixo'>
                                         <div class='borda2'>
                                             <div id='conteudo'>
                                                 <h2>Ingredientes:</h2>
                                                 <p class='Ingredientes'></p>
                                                 <h2>Como Usar:</h2>
                                                 <p class='Como-Usar'></p>
                                                 <h2>Ocasião:</h2>
                                                 <p class='Ocasiao'></p>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </section>
                         </main>
                        <footer class='footer'>
                            <div class='footer-content'>
                                <p>© 2024 Rpavan - Todos os direitos reservados</p>
                                <div class='social-links'>
                                    <a href='https://vm.tiktok.com/ZMkLAYDFs/' target='_blank' class='social-icon'>
                                        <img src='img/tik-tok.png' alt='Facebook'>
                                    </a>
                                    <a href='https://www.instagram.com/r.pavan57?igsh=NG83dTdnZG05eDlw' target='_blank' class='social-icon'>
                                        <img src='img/instagram.png' alt='Instagram'>
                                    </a>
                                    <a href='sobre.html'>
                                        Sobre
                                    </a>
                                </div>
                            </div>
                        </footer>
                         <script src='js/validarToken.js'></script>
                         <script src='js/pesquisa.js'></script>
                         <script src='js/atualizapagina.js'></script>
                         <script src='js/carrinho2.js'></script>
                     </body>
                     </html>
                     ";
                     $file_path = "produto_$idproduto.html";

                     // Salva o conteúdo HTML em um arquivo
                     if (file_put_contents($file_path, $html_content)) {
                        echo "<br>Página do produto criada com sucesso! <a href='$file_path'>Ver Produto</a>";
                     }
                } else {
                    echo "erro ao inserir produto.";
                }
            } catch (PDOException $e){
                echo "Erro: ". $e->getMessage();
            }
        } else {
            echo "Erro ao fazer upload da imagem.";
        }
    }else {
        echo "Erro: imagem não foi enviada corretamente";
    }
}
?>