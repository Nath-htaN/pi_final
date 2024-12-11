//Ação do botão de buscar produto

// Ação do formulário de atualização
function buscarProduto() {
    const search = document.getElementById("search").value;  // Obtém o valor da busca
    const resultados = document.getElementById("resultados");
    
    // Verifica se o campo de busca não está vazio
    if (search.length > 0) {
        const xhr = new XMLHttpRequest();
        // Corrige a URL da requisição
        xhr.open("GET", `pegaproduto.php?nome=${encodeURIComponent(search)}`, true);
        
        // Configura o tratamento da resposta quando a requisição for concluída
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Parse da resposta JSON (assumindo que o servidor retorna um JSON)
                const produtos = JSON.parse(xhr.responseText);
                
                // Limpa os resultados anteriores
                resultados.innerHTML = "";
                
                // Verifica se há produtos retornados
                if (produtos.length > 0) {
                    produtos.forEach(produto => {
                        // Cria um novo item de lista para cada produto
                        const item = document.createElement('li');
                        item.idproduto = produto.idproduto; // Supondo que a resposta tenha um campo "id"
                        
                        // Ação ao clicar no item
                        item.onclick = () => {
                            window.location.href = `produto_${produto.idproduto}.html`; // Redireciona para a página do produto
                        }
                        const texto = document.createElement('div');
                        texto.className = 'texto';
                        // Criação do conteúdo do item de lista
                        const imagem = document.createElement('img');
                        imagem.src = produto.imagem;  // Supondo que a resposta tenha o campo "imagem"
                        imagem.alt = produto.nome;    // O nome do produto é usado no alt da imagem

                        const nome = document.createElement('h4');
                        nome.textContent = produto.nome; // Nome do produto

                        const preco = document.createElement('span');
                        preco.className = 'preco';
                        preco.textContent = `R$ ${produto.preco}`;  // Supondo que a resposta tenha o campo "preco"

                        // Adiciona os elementos criados ao item
                        item.appendChild(imagem);
                        texto.appendChild(nome);
                        texto.appendChild(preco);
                        item.appendChild(texto);


                        // Adiciona o item à lista de resultados
                        resultados.appendChild(item);
                    });

                    // Exibe os resultados
                    resultados.style.display = 'block';
                } else {
                    // Se não houver produtos, esconde os resultados
                    resultados.innerHTML = "Nenhum produto encontrado.";
                    resultados.style.display = 'block';
                }
            }
        };

        // Envia a requisição
        xhr.send();
    } else {
        // Se o campo de busca estiver vazio, limpa e esconde os resultados
        resultados.innerHTML = "";
        resultados.style.display = 'none';
    }
}