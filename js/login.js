function Logar(){
    const form=document.getElementById('formlogin');
    const formData=new FormData(form);

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response=>{
      if(response.ok){
        window.location.replace('index.html')
      }else{
        return response.text().then(text=>{
            document.getElementById('mensagem').innerHTML=text;
        })
      }
    })
    .catch(error=>{
        console.error('Erro: ', error);
        document.getElementById('mensagem').innerText='Erro ao realizar o login.';
    });
}