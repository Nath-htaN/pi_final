function inserirProduto(){
    const form = document.getElementById('produtoForm');
    const formData = new FormData(form);

    fetch('inseredados.php',{
        method: 'POST',
        body: formData
    })
    .then(response=> response.text())
    .then(data=> {
        document.getElementById('mensagem').innerText = data;
        form.reset();
    })
    .catch(error=> {
        console.error("Erro:", error);
        document.getElementById('mensagem').innerText = 'Erro ao inserir o produto';
    });
}
function carregarCategorias(){
    fetch('pegacategoria.php')
    .then(response => response.json())
    .then(data => {
        const selectCategoria = document.getElementById('categoria');
        data.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.idcategoria;
            option.textContent = categoria.nome;
            selectCategoria.appendChild(option);
        });
    })
    .catch(error=> {
        console.error('Erro ao carregar categorias: ', error);
    })
}
document.addEventListener("DOMContentLoaded", carregarCategorias);