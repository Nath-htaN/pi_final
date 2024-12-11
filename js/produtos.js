function carregarProdutos(){
    fetch('produtos.php')
        .then(response => response.json())
        .then(produtos =>{
            const container = document.getElementById('grid')
            container.innerHTML = '';
            produtos.forEach(produto =>{
                const produtoDiv = document.createElement('div');
                produtoDiv.className = 'item';
                produtoDiv.onclick = () =>{
                    window.location.href = `produto_${produto.idproduto}.html`;
                };
                const imagem = document.createElement('img');
                imagem.src = produto.imagem;
                imagem.alt = produto.nome;
                const nome = document.createElement('h4');
                nome.textContent = produto.nome;
                const preco = document.createElement('span');
                preco.className = 'preco';
                preco.textContent = `R$ ${produto.preco}`;
                produtoDiv.appendChild(imagem);
                produtoDiv.appendChild(nome);
                produtoDiv.appendChild(preco);
                container.appendChild(produtoDiv)
            });
        })
        .catch(error => console.error('Error', error));
}
document.addEventListener("DOMContentLoaded", carregarProdutos);