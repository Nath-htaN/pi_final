document.addEventListener('DOMContentLoaded', function () {
function excluirProduto(event){
    event.preventDefault();
    
    const form = document.getElementById('formAtualizarProduto');
    const formData = new FormData(form);
    fetch('deletaproduto.php',{
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data =>{
            document.getElementById('resultado').innerHTML = data;
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = "Erro ao atualizar o produto: " + error;
        })
}
    document.getElementById('deletarproduto').addEventListener('click', excluirProduto);
})
// create table lixeira as select * from produto where 1=0;