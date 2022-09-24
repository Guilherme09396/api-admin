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

exemplo:
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
### POST /user/login
Esse edpoint é responsável por realizar o login de usuários cadastrados
#### Parâmetros

e-mail: e-mail do novo usuário 

password: senha do novo usuário

exemplo:
```
{
    "email": "admin",
    "password": "admin"
}
```

#### Respotas
##### OK! 200
caso essa resposta aconteça, o usuário foi logado com êxito

exemplo de resposta: 
```
{
    "status": true,
    "msg": "Usuário logado",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwicm9sZSI6IjEiLCJpYXQiOjE2NjM5ODY1OTgsImV4cCI6MTY2NDE1OTM5OH0.Z6sqUvQQ5uylQuyqgItX0wgaOVIiOJPBHA3u4WzPsbU"
}
```
##### UNAUTHORIZED! 401
caso essa resposta aconteça, o usuário digitou a senha incorreta

exemplo de resposta: 
```
{
    "status": false,
    "scode": 401,
    "err": "Senha incorreta"
}
```
##### NOT FOUND! 404
caso essa resposta aconteça, o e-mail informado não está cadastrado

exemplo de resposta:
```
{
    "status": false,
    "scode": 404,
    "err": "E-mail não cadastrado"
}
```

### GET /user
Esse edpoint é responsável por retornar todos os usuários cadastrados no banco de dados
#### Parâmetros
Nenhum!


#### Respotas
##### OK! 200
caso essa resposta aconteça, o usuário foi logado com êxito

exemplo de resposta: 
```
{
    "status": true,
    "msg": "Usuário logado",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwicm9sZSI6IjEiLCJpYXQiOjE2NjM5ODY1OTgsImV4cCI6MTY2NDE1OTM5OH0.Z6sqUvQQ5uylQuyqgItX0wgaOVIiOJPBHA3u4WzPsbU"
}
```
##### UNAUTHORIZED! 401
caso essa resposta aconteça, o usuário digitou a senha incorreta

exemplo de resposta: 
```
{
    "status": false,
    "scode": 401,
    "err": "Senha incorreta"
}
```
##### NOT FOUND! 404
caso essa resposta aconteça, o e-mail informado não está cadastrado

exemplo de resposta:
```
{
    "status": false,
    "scode": 404,
    "err": "E-mail não cadastrado"
}
```


```
```


```
```
