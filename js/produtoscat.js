function carregarProdutos(){
    const idcategoria = document.getElementById("idcategoria").innerText;
    const grid = document.getElementById('grid')
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `pegaprodutocat.php?id=${idcategoria}`, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            const produtos = JSON.parse(xhr.responseText);
            grid.innerHTML = "";

            if (produtos.length > 0){
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
                grid.appendChild(produtoDiv)
                })
            } else {
                grid.innerHTML = "Nenhum produto encontrado";
            }
        }
    }
    xhr.send();
}
document.addEventListener("DOMContentLoaded", carregarProdutos);