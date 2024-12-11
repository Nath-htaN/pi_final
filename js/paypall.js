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


paypal.Buttons({
    createOrder: function(data, actions) {
        var totalValue = parseFloat(document.getElementById('total').textContent.replace(',', '.')).toFixed(2);

        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: "BRL",
                    value: totalValue
                }
            }]
        });
    },
    onApprove: async function(data, actions) {
        const idusuario= await IdToken();

        // Selecionar todos os itens do carrinho
        const itensDoCarrinho = document.querySelectorAll('#cart .item');

        // Inicializar um array para armazenar os dados dos produtos
        let produtos = [];

        const total = parseFloat(document.querySelector('#total')?.textContent.trim());
        // Iterar sobre os itens e extrair os dados
        itensDoCarrinho.forEach(item => {
            let idproduto = item.querySelector('.idprod')?.textContent.trim();
            let quantidade = item.querySelector('.quant')?.textContent.trim();
            let preco = item.querySelector('.preco')?.textContent.trim();
            let subtotal = item.querySelector('.subtotal')?.textContent.trim();
            let idcarrinho = item.querySelector('.idcarrinho')?.textContent.trim();

            // Adicionar os dados ao array
            produtos.push({
                idproduto: idproduto,
                quantidade: parseInt(quantidade), // Converter para número
                preco: parseFloat(preco.replace('R$', '').trim()), // Converter para número
                subtotal: parseFloat(subtotal),
                idcarrinho: parseFloat(idcarrinho),
            });
        });
        try {
            const response = await fetch('adicionar_pedido.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    produtos: produtos,
                    total: total,
                    idusuario: idusuario
                })
            });
    
            const result = await response.json(); // Espera a resposta do PHP no formato JSON

            if (result.status === 'success') {
                alert (result.message);
                // Após a aprovação do pagamento
                return actions.order.capture().then(function(details) {
                    alert('Pagamento realizado com sucesso por ' + details.payer.name.given_name);
                    window.location.href = 'pedidos.html';
                });
            } else {
                alert(`Erro ao criar o pedido: ${result.message}`);
            }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Houve um erro ao processar sua solicitação.');
            }
    }
}).render('#paypal-button-container'); 