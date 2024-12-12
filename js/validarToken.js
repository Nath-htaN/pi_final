// Função para obter o token do cookie
const projectPath = window.location.pathname.split('/').slice(0, -1).join('/');
function getTokenFromCookies() {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('accountholder='))
        ?.split('=')[1];
}
function deslogar(nome){
    document.cookie = nome + `=; expires = Thu 01 jan 1970 00:00 UTC; path=${projectPath}`
    location.reload();
  }

// Função para validar o token via backend
async function validateToken(token) {
    try {
        const response = await fetch('validarToken.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            console.error('Erro na validação do token:', response.statusText);
            return false;
        }

        const result = await response.json();
        return result.valid === true;
    } catch (error) {
        console.error('Erro ao validar o token:', error);
        return false;
    }
}

// Função principal para verificar se o usuário está logado
async function isUserLoggedIn() {
    const token = getTokenFromCookies();

    if (!token) {
        console.warn('Token não encontrado nos cookies.');
        return false;
    }

    // Cache simples para evitar validação repetida
    if (isUserLoggedIn.cache && isUserLoggedIn.cache.token === token) {
        return isUserLoggedIn.cache.isValid;
    }

    const isValid = await validateToken(token);

    // Salvar o resultado no cache
    isUserLoggedIn.cache = { token, isValid };
    return isValid;
}
(async function updateMenu(){
    const token = getTokenFromCookies();
    const isLogged= await isUserLoggedIn();
    const menu = document.querySelector('.submenu')
    menu.innerHTML="";
    if(isLogged){
        try{
            const response = await fetch('pegartipo.php', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
            if (response.ok){
                const tipo = await response.json();
                const tipoid = tipo.tipousuario
                if(tipoid == 0){
                    const linha = document.querySelector('.linha')
                    const menu = document.querySelector('.submenu')
                        menu.innerHTML ="";
                        const link = document.createElement('a');
                        link.textContent = 'Cadastrar Produto'
                        link.href = 'cadastro.html';
                        const link2 = document.createElement('a');
                        link2.textContent = 'Alterar Produto'
                        link2.href = 'alteracao.html';
                        const link3 = document.createElement('a');
                        link3.textContent='Checar Pedidos';
                        link3.href='pedidosCliente.html';
                        const log = document.createElement('a');
                        log.onclick = function(){
                            deslogar('accountholder');
                        }
                        log.textContent = 'Logout'
                        const adm = document.createElement('a');
                        adm.textContent = 'ADMINISTRADOR'
                        linha.appendChild(adm)
                        menu.appendChild(link)
                        menu.appendChild(link2)
                        menu.appendChild(link3)
                        menu.appendChild(log)
                }else if(tipoid == 1){
                    const menu = document.querySelector('.submenu')
                    menu.innerHTML ="";
                    const link = document.createElement('a');
                    link.textContent = 'Meus pedidos'
                    link.href = 'pedidos.html';
                    const log = document.createElement('a');
                    log.onclick = function(){
                        deslogar('accountholder');
                    }
                    log.textContent = 'Logout'
                    menu.appendChild(link)
                    menu.appendChild(log)
                }
                
            }
        } catch(error){
            console.error('erro no tipo', error);
            return false;
        }
    }else{
        menu.innerHTML ="";
        const link = document.createElement('a');
        link.textContent = 'login'
        link.href = 'login.html';
        menu.appendChild(link);
    }
})();

function abreomenu(){
    const submenu = document.getElementById("loginsubmenu")
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}
document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("click",function(event){
        const usericon = document.querySelector(".incon-avatar");
        const submenu = document.getElementById("loginsubmenu");
        if(!usericon.contains(event.target) && !submenu.contains(event.target)){
            submenu.style.display = "none";
        }
    })
})
function toggleMenu() {
    const leftMenu = document.querySelector(".leftmenu");  // Seleciona o menu à esquerda
    leftMenu.classList.toggle("active");  // Alterna a classe "active" no menu à esquerda

    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");  // Opcional: Se você quiser que o hambúrguer tenha alguma animação
}
