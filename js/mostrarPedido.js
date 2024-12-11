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
const idlista=document.getElementById('orders');

async function mostrarPedido(){
    const idusuario= await IdToken();
    const xhr=new XMLHttpRequest();
    xhr.open('GET',`mostrarPedido.php?idusuario=${idusuario}`,true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState=== 4 && xhr.status === 200){
            const pedidos = JSON.parse(xhr.responseText);
            idlista.innerHTML =" ";
            if(pedidos.length > 0 ){
                pedidos.forEach(pedido =>{
                    const item = document.createElement('li');
                    item.className='item'

                    const texto = document.createElement('div');
                    texto.className = 'texto';
                    
                    const imagem = document.createElement('img')
                    imagem.src = pedido.imagem;
                    imagem.alt = pedido.nome_produto;
                    imagem.onclick = () =>{
                        window.location.href = `produto_${pedido.idproduto}.html`;
                    };

                    const nome = document.createElement('h4')
                    nome.className = 'nome';
                    nome.textContent = pedido.nome_produto;
                    nome.onclick = () =>{
                        window.location.href = `produto_${pedido.idproduto}.html`;
                    };

                    quantidade = document.createElement('div');
                    quantidade.className='quantidade'
                    opcao = document.createElement('div');
                    opcao.className='opcao';

                    const preco = document.createElement('span');
                    preco.className = 'preco';
                    preco.textContent = `R$ ${pedido.preco}`;

                    const quant = document.createElement('span');
                    quant.className = 'quant';
                    quant.textContent = pedido.quantidade;

                    const sub = document.createElement('span');
                    sub.className = 'subtotal';
                    sub.textContent = `R$ ${pedido.subtotal}`;

                    const idpedido = document.createElement('h5');
                    idpedido.className='idpedido'
                    idpedido.textContent = pedido.idpedido;
                    idpedido.style.display = 'none';


                    const data = document.createElement('p');
                    data.className ='data';
                    data.textContent = pedido.data;
                    
                    item.appendChild(imagem);
                    texto.appendChild(idpedido);
                    texto.appendChild(nome);
                    quantidade.appendChild(quant);
                    opcao.appendChild(quantidade)
                    texto.appendChild(opcao);
                    texto.appendChild(preco);
                    texto.appendChild(sub);
                    item.appendChild(texto);
                    idlista.appendChild(item);
            })
            } else {
                const vazio = document.createElement('h2')
                vazio.textContent='Nenhum pedido'
                idlista.appendChild(vazio);
            }
        }
    }
    xhr.send()
}

document.addEventListener("DOMContentLoaded", mostrarPedido);