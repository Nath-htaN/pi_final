// Função para obter o token do cookie
function PegarCookie() {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('accountholder='))
        ?.split('=')[1];
}

// Função para validar o token via backend
async function IdToken() {
    const token = PegarCookie();

    if (!token) {
        console.warn('Token não encontrado nos cookies.');
        return false;
    }
    try {
        const response = await fetch('pegaridtoken.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            console.error('Erro ao receber o ID do Token', response.statusText);
            return false;
        }

        const result = await response.json();
        return result.idusuario;
    } catch (error) {
        console.error('Erro no Token', error);
        return false;
    }
}


async function addCarrinho() {
    const idproduto = document.querySelector(".idproduto").textContent.trim();
    const quantidade=document.querySelector(".qty").textContent.trim();
    const idusuario= await IdToken();
    console.log(idusuario);
    try {
        const response = await fetch('adicionar_carrinho.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idproduto: idproduto,
                quantidade: quantidade,
                idusuario: idusuario
            })
        });

        const result = await response.json(); // Espera a resposta do PHP no formato JSON

        if (result.status === 'success') {
            // Redireciona para a página do carrinho
            window.location.href = 'carrinho.html';
        } else {
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Houve um erro ao processar sua solicitação.');
    }
}
function addQty(){
    event.preventDefault();
    const quantidade = document.querySelector(".qty");
    valor = parseInt(document.querySelector(".qty").textContent.trim());
    valor += 1;
    quantidade.innerHTML="";
    quantidade.textContent=valor;

}
function removeQty(){
    event.preventDefault();
    const quantidade = document.querySelector(".qty");
    valor = parseInt(document.querySelector(".qty").textContent.trim());
    if(valor!=1){
        valor -= 1;
        quantidade.innerHTML="";
        quantidade.textContent=valor;
    }

}