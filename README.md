# Banco Central Cidade Alta


![enter image description here](https://i.imgur.com/lvyxXWP.png)


> Essa aplicação foi desenvolvida como parte do programa de recrutamento para o Cidade Alta e a utilização do código é livre para estudos.

## Tecnologias Utilizadas

 - Asp Net Core 2.2 com Entity Framework
 - AngularJS 1.7^ (npm, grunt e bower)
 - MariaDB (phpmyadmin)

## Estrutura Back-End

 - O projeto foi desenvolvido seguindo a estrutura, conforme abaixo:
 
 ![enter image description here](https://i.imgur.com/ZqFpGIT.png)
 
 - **Core**: Possui interfaces de repositórios para registro de métodos e comunicação com a service.
 - **Controller**: Comunicação inicial com o front-end e redirecionamento para da interface (sem lógica de negócio)
 - **Data**: Configuração do banco de dados e interfaces para classes genéricas
 - **Services**: Lógica de negócios da aplicação (separada por controller)

|     MÉTODO           |     URL           |DESCRIÇÃO|
|----------------|----------------|-------------------------------|
| `GET` |`/api/user` |      Obtém a lista de usuários cadastrados e o respectivo saldo     |
|`GET`|`/api/user/{id}` |      Obtém o usuário de ID especificado e o respectivo saldo     |
|`GET`|`/api/user/authenticate/{id}` |      Realiza a autenticação do usuário especificado no Front End e cria um usuário automático caso o ID não exista (criado para teste do frontend     |
|`GET`|`/api/register/extrato/{id}` |      Obtém o extrato do usuário especificado     |
|`GET`|`/api/register` |      Obtém o extrato de todos os usuários     |
|`POST`|`/api/user` |      Cria um novo usuário     |
|`POST`|`/api/user/transfer` |      Realiza um transferência     |
|`POST`|`/api/user/withdraw` |      Realiza um saque     |
|`POST`|`/api/user/deposit` |      Realiza um depósito    |

**Criar um usuário**:

    {
        "Nome":"Gomez"
    }

**Realizar uma transferência**:

    {
	    "FromUserId":  2,
	    "ToUserId":  1,
	    "Total":  5000
    }

**Realizar saque e depósito**:

    {
    	"UserId":  1,
    	"Total":  1
    }

## Front-End

![enter image description here](https://i.imgur.com/bhsLBB2.png)

O front foi construído para fins de visualização dos dados, realizar saques, depósitos e transferências.

> Para realizar o build do sistema utilize `grunt heroku`