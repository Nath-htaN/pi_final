async function cadastroUsuario(){
    const form=document.getElementById('usuarioForm');
    const formData=new FormData(form);

    try {
        const response = await fetch('cadastrousu.php', {
            method: 'POST',
            body: formData
        })
        const result = await response.json();
        alert (result.message);
        form.reset();
        if(result.status === 'success'){
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error('Erro: ', error);
        alert('Erro ao cadastrar usuário.');
    }
}