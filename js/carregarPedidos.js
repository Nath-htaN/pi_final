async function carregarPedidos(){
    try{
        const response = await fetch('carregarPedidos.php');
        if(!response.ok) throw new Error("Error ao carregar os pedidos.");

        const pedidos = await response.json()
        if(pedidos.error){
            document.getElementById('loading').innerText = `Error: ${pedidos.error}`;
            return;
        }
        const lista = document.getElementById('pedidosList');
        document.getElementById('loading').style.display = 'none';
        lista.style.display = 'block';

        pedidos.forEach(pedido => {
            const item = document.createElement('li');
            item.className='pedido';
            item.style.margin='10px';
            item.innerHTML=`
                        <div class="pedido-title"><strong>Pedido #${pedido.idpedido}</strong></div>
                        <div class="pedido-info">
                            <strong>Cliente:</strong> ${pedido.cliente_nome} ${pedido.cliente_sobrenome} <br>
                            <strong>Contato:</strong> ${pedido.cliente_contato} <br>
                            <strong>CEP:</strong> ${pedido.cliente_cep} <br>
                            <strong>Total do Pedido:</strong> R$ ${pedido.pedido_total} <br>
                            <strong>Data do Pedido:</strong> ${pedido.data_pedido}
                        </div>
                        <ul class="itens-list">
                            ${pedido.itens.map(item => `
                                <li>
                                    <strong>Produto:</strong> ${item.produto_nome} |
                                    <strong>Quantidade:</strong> ${item.quantidade} |
                                    <strong>Preço Unitário:</strong> R$ ${item.preco} |
                                    <strong>Subtotal:</strong> R$ ${item.subtotal}
                                </li>
                            `).join('')}
                        </ul>
                    `;
                    lista.appendChild(item);
        });
    }catch(error){
        document.getElementById('loading').innerText = `Error ao carregar os pedidos: ${error.message}`
    }
}
document.addEventListener("DOMContentLoaded", carregarPedidos);