document.addEventListener('DOMContentLoaded', function () {
    function buscarProduto() {
        const buscaNome = document.getElementById('buscaNome').value;
        if (!buscaNome) {
            alert("Por favor, insira o nome do produto.");
            return;
        }

        const formData = new FormData();
        formData.append('acao', 'buscar');
        formData.append('nome', buscaNome);

        fetch('alteraproduto.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor: ' + response.status);
                }
                return response.text();  
            })
            .then(bodyText => {
                try {
                    const data = JSON.parse(bodyText);  
                    if (data.sucesso) {
                        document.getElementById('idproduto').value = data.produto.idproduto;
                        document.getElementById('nome').value = data.produto.nome;
                        document.getElementById('preco').value = data.produto.preco;
                        document.getElementById('descricao').value = data.produto.descricao;
                        document.getElementById('ingredientes').value = data.produto.ingredientes;
                        document.getElementById('usar').value = data.produto.usar;
                        document.getElementById('ocasiao').value = data.produto.ocasiao;
                        document.getElementById('categoria').value = data.produto.idcategoria;
                        const imagemProduto = document.getElementById('imagemProduto');
                        imagemProduto.src = data.produto.imagem;  

                        document.getElementById('formAtualizarProduto').style.display = 'block';
                        document.getElementById('mensagemBusca').innerHTML = '';

                        document.getElementById('formAtualizarProduto').style.display = 'block';
                        document.getElementById('mensagemBusca').innerHTML = '';
                    } else {
                        document.getElementById('mensagemBusca').innerHTML = "Produto não encontrado.";
                        document.getElementById('formAtualizarProduto').style.display = 'none';
                    }
                } catch (e) {
                    console.error('Erro ao tentar parsear JSON:', e);
                    console.log('Resposta recebida:', bodyText);  
                    document.getElementById('mensagemBusca').innerHTML = "Erro no servidor, resposta inválida.";
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o produto:', error);
                document.getElementById('mensagemBusca').innerHTML = "Erro ao buscar o produto.";
            });
    }

    function atualizarProduto(event) {
        event.preventDefault(); 

        const form = document.getElementById('formAtualizarProduto');
        const formData = new FormData(form);
        formData.append('acao', 'atualizar');

        fetch('alteraproduto.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                document.getElementById('resultado').innerHTML = data;
            })
            .catch(error => {
                document.getElementById('resultado').innerHTML = "Erro ao atualizar o produto: " + error;
            });
    }
    document.getElementById('buscarProdutoBtn').addEventListener('click', buscarProduto);
    document.getElementById('formAtualizarProduto').addEventListener('submit', atualizarProduto);
});

// Ação do botão de buscar produto

// Ação do formulário de atualização
/*function buscarProduto() {
    const search = document.getElementById("search").value;
    const resultados = document.getElementById("resultados");

    if (search.length > 0) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `pegaproduto.php?nome=${encodeURIComponent(search)}`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resultados.innerHTML = xhr.responseText;
            }
        };
        xhr.send();
    } else {
        resultados.innerHTML = "";
    }
}*/