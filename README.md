# Api admin
Esta api é uma api simples, com o intuito de treinar os meus conhecimentos. Utilizando a ideia de administração, é possível limitar o acesso somente 
para admins

## Endpoints
### POST /user
Esse edpoint é responsável por criar um novo usuário, somente usuários admins pode acessar a rota
#### Parâmetros
nome: nome do novo usuário

e-mail: e-mail do novo usuário 

password: senha do novo usuário
```
{
    "name": "John Doe",
    "email": "admin",
    "password": "admin"
}
```

#### Respotas
##### CREATED! 201
caso essa resposta aconteça, o usuário foi cadastrado com sucesso!

Exemplo de resposta: 
```
{
    "status": true
}
```
##### Unprocessable Entity! 422
caso essa resposta aconteça, o e-mail informado já está cadastrado.

Exemplo de resposta: 
```
{
    "status": false,
    "scode": 422,
    "err": "E-mail já cadastrado"
}
```
##### Internal Server Error! 500
caso essa resposta aconteça, houve um erro ao criar o usuário

Exemplo de resposta: 

```
{
    "status": false,
    "scode": 500,
    "err": "Houve um erro ao criar usuário"
}
```
##### Unauthorized! 401
caso essa resposta aconteça, é porque o usuário logado não tem permissão por não ser admin

Exemplo de resposta: 
```
{
    "err": "Você não tem permissão para acessar essa área"
}
```
##### Not Found! 404
caso essa resposta aconteça, é porque o usuário não está logado

exemplo de resposta: 

```
{
    "err": "Token inválido"
}
```
##### Unauthorized! 401
caso essa resposta aconteça, o token está expirado

exemplo de resposta: 

```
{
    "err": "Token inválido"
}
```
