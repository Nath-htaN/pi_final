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

const idlista=document.getElementById('cart');


async function mostrarCarrinho(){
    const idusuario= await IdToken();
    const xhr=new XMLHttpRequest();
    xhr.open('GET',`mostrarCarrinho.php?idusuario=${idusuario}`,true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState=== 4 && xhr.status === 200){
            const produtos = JSON.parse(xhr.responseText);
            idlista.innerHTML =" ";
            if(produtos.length > 0 ){
                produtos.forEach(produto =>{
                    const item = document.createElement('li');
                    item.className='item'

                    const id = document.createElement('p');
                    id.className='idprod'
                    id.textContent = produto.idproduto;
                    id.style.display = 'none';

                    const texto = document.createElement('div');
                    texto.className = 'texto';
                    
                    const imagem = document.createElement('img')
                    imagem.src = produto.imagem;
                    imagem.alt = produto.nome;
                    imagem.onclick = () =>{
                        window.location.href = `produto_${produto.idproduto}.html`;
                    };

                    const nome = document.createElement('h4')
                    nome.className = 'nome';
                    nome.textContent = produto.nome;
                    nome.onclick = () =>{
                        window.location.href = `produto_${produto.idproduto}.html`;
                    };
                    quantidade = document.createElement('div');
                    quantidade.className='quantidade'
                    opcao = document.createElement('div');
                    opcao.className='opcao';
                    const preco = document.createElement('span');
                    preco.className = 'preco';
                    preco.textContent = `R$ ${produto.preco}`;

                    const quant = document.createElement('span');
                    quant.className = 'quant';
                    quant.textContent = produto.quantidade;

                    const sub = document.createElement('span');
                    sub.className = 'subtotal';
                    sub.textContent = produto.subtotal;
                    sub.style.display = 'none';

                    const idcarrinho = document.createElement('h5');
                    idcarrinho.className='idcarrinho'
                    idcarrinho.textContent = produto.idcarrinho;
                    idcarrinho.style.display = 'none';

                    const maior= document.createElement('div')
                    maior.className='mais'
                    const menor= document.createElement('div')
                    menor.className='menos'
                    const menos= document.createElement("img");
                    menos.src="img/menor.svg";
                    menos.alt="Diminuir Quantidade"
                    menos.onclick=()=>removerQty(quant, produto.idcarrinho);
                    
                    const mais= document.createElement("img");
                    mais.src="img/maior.svg";
                    mais.alt="Adicionar Quantidade"
                    mais.onclick=()=>addQty(quant, produto.idcarrinho);

                    const remover=document.createElement("button");
                    remover.className='remover';
                    remover.type='button';
                    remover.textContent="Remover do Carrinho"
                    remover.onclick=()=>removerProduto(produto.idcarrinho)

                    item.appendChild(imagem);
                    texto.appendChild(id);
                    texto.appendChild(nome);
                    menor.appendChild(menos);
                    maior.appendChild(mais)
                    quantidade.appendChild(menor);
                    quantidade.appendChild(quant);
                    quantidade.appendChild(maior);
                    opcao.appendChild(quantidade)
                    texto.appendChild(opcao);
                    texto.appendChild(preco);
                    texto.appendChild(idcarrinho);
                    texto.appendChild(sub);
                    texto.appendChild(remover);
                    item.appendChild(texto);
                    idlista.appendChild(item);
            })
            } else {
                const vazio = document.createElement('h2')
                vazio.textContent='Nenhum item no carrinho'
                idlista.appendChild(vazio);
            }
            const subtotais = document.querySelectorAll('.subtotal');
            let total = 0;
            subtotais.forEach(subtotal =>{
                total += parseFloat(subtotal.textContent) || 0;
            });
            document.getElementById('total').textContent = total.toFixed(2);
            document.getElementById('total1').textContent = `R$ ${total.toFixed(2)}`;
        }
    }
    xhr.send()
}
async function addQty(quantidade, idcarrinho){
    const valor = parseInt(quantidade.textContent.trim()) + 1;
    try {
        const response = await fetch('quantidade.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                quantidade: valor,
                idcarrinho: idcarrinho
            }),
        });

        if (!response.ok) {
            console.error('Erro ao adicionar quantidade', response.statusText);
            return false;
        }
        console.log("Quantidade alterada")   
        quantidade.textContent=valor;
        window.location.reload(true);   // Isso esta aqui devido eu não ter conseguido fazer de outra maneira o valor total alterar quando adiciona      
        
    } catch (error) {
        console.error('Um erro ocorreu na resposta', error);
        return false;
    }
    
}
async function removerQty(quantidade, idcarrinho){
    const valor = parseInt(quantidade.textContent.trim()) - 1;
    try {
        const response = await fetch('quantidade.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                quantidade: valor,
                idcarrinho: idcarrinho
            }),
        });

        if (!response.ok) {
            console.error('Erro ao adicionar quantidade', response.statusText);
            return false;
        }
        console.log("Quantidade alterada")   
        quantidade.textContent=valor;
        window.location.reload(true);   // Isso esta aqui devido eu não ter conseguido fazer de outra maneira o valor total alterar quando adiciona      
 
    } catch (error) {
        console.error('Um erro ocorreu na resposta', error);
        return false;
    }
    
}
async function removerProduto(idcarrinho) {
    const valor = 0;
    try {
        const response = await fetch('quantidade.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                quantidade: valor,
                idcarrinho: idcarrinho
            }),
        });

        if (!response.ok) {
            console.error('Erro ao remover do carrinho', response.statusText);
            return false;
        }
        window.location.reload(true);   // Isso esta aqui devido eu não ter conseguido fazer de outra maneira o valor total alterar quando adiciona      
 
    } catch (error) {
        console.error('Um erro ocorreu na resposta de remoção do carrinho', error);
        return false;
    }
}


document.addEventListener("DOMContentLoaded", mostrarCarrinho);