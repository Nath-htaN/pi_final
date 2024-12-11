<?php
include('conexao.php');
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $nome=htmlspecialchars($_POST['nome']);
    $sobrenome=htmlspecialchars($_POST['sobrenome']);
    $email=htmlspecialchars($_POST['email']);
    $cpf=(int)$_POST['cpf'];
    $datas=htmlspecialchars($_POST['datas']);
    $celular=(int)$_POST['celular'];
    $senha=htmlspecialchars($_POST['senha']);
    $genero=htmlspecialchars($_POST['genero']);
    $cep=htmlspecialchars($_POST['cep']);
    $senha = password_hash($senha, PASSWORD_DEFAULT);
        try{
            $stmtCPF=$conexao->prepare("SELECT cpf FROM usuario WHERE cpf LIKE :cpf");
            $stmtCPF->execute([':cpf' => "%$cpf%"]);
            $stmtEmail=$conexao->prepare("SELECT email FROM usuario WHERE email LIKE :email");
            $stmtEmail->execute([':email' => "%$email%"]);
            if(($stmtCPF) and ($stmtCPF->rowCount()!=0) ||($stmtEmail->rowCount()!=0) ){
                echo json_encode(['status' => 'error', 'message' => 'Usuário ja existente']);
            }else{
                $sql="INSERT INTO usuario(nome, sobrenome, email, cpf, celular, senha, genero, datas, cep) VALUES (:nome, :sobrenome, :email, :cpf, :celular, :senha, :genero, STR_TO_DATE(:datas, '%d%m%Y'), :cep)";
                $stmt=$conexao->prepare($sql);
                $stmt->bindParam(':nome', $nome);
                $stmt->bindParam(':sobrenome', $sobrenome);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':cpf', $cpf);
                $stmt->bindParam(':datas', $datas);
                $stmt->bindParam(':celular', $celular);
                $stmt->bindParam(':senha', $senha);
                $stmt->bindParam(':genero', $genero);
                $stmt->bindParam(':cep', $cep);

                if($stmt->execute()){
                    echo json_encode(['status' => 'success', 'message' => 'Usuário cadastrado!']);
                }else{
                    echo json_encode(['status' => 'error', 'message' => "Erro ao cadastrar usuário."]);
                }
            }
        }catch(PDOException $e){
            echo json_encode(['status' => 'error', 'message' => "Erro ao criar usuário" . $e->getMessage()]);
        }
}
?>