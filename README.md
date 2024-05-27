
# ℹ Auth JWT
Api de autenticação via JWT, utilizando MongoDB e Express.
## Rotas
#### Obter informações do usuário logado
```http
GET /user/me
```
**Retorno:**
Caso bem sucedido, retornará um objeto com os detalhes do usuário
```json
{
	"_id": "7590fcab-ac73-4e0a-b350-fea4dbdd2d1f",
	"username": "johnn",
	"password": "$2b$04$bTmPBkb/tFrnfOuh8.LwieflRxiqd6LvBhUuRIVQl5PX1FEt4j6Iy"
}
```
#### Fazer log-in
```http
POST /user/login
```
| Parâmetro | Tipo | Descrição | Local |
| :-------- | :------- | :-------------------------------- | :---- |
|  `username`  |  `string`  | Usuário | Body
|  `password`  |  `string`  | Senha | Body
**Retorno:**
Caso bem sucedido, retornará um token jwt
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3NTkwZmNhYi1hYzczLTRlMGEtYjM1MC1mZWE0ZGJkZDJkMWYiLCJpYXQiOjE3MTY4MzY5MTAsImV4cCI6MTcxNjg0MDUxMH0.7Ympnoi8IhLkG2sblhBm4zyLBkW9mWfkWdIuiKPyF7Y"
}
```
#### Atualizar informações do usuário logado
```http
POST /user/?update=${field}
```
| Parâmetro | Tipo | Descrição | Local |
| :-------- | :------- | :-------------------------------- | :---- |
|  `field`  |  `string`  | O que será atualizado ("username" ou "password")| Query
|  `newValue`  |  `string`  | O novo valor| Body
|  `authorization`  |  `string`  | O token jwt| Body
#### Criar novo usuário
```http
POST /user/new
```
| Parâmetro | Tipo | Descrição | Local |
| :-------- | :------- | :-------------------------------- | :---- |
|  `username`  |  `string`  | O nome do usuário| Body
|  `password`  |  `string`  | A senha| Body

## 💻 Utilizando
```bash
$ git clone https://github.com/torresds/express-jwt-mongodb.git
$ cd express-jwt-mongodb
$ pnpm install
$ pnpm run build
```
## 📑 Funcionalidades
- [x] Log-in
- [x] Rotas protegidas
- [x] Possibilidade do usuário modificar seu usuário e senha
- [ ] Log-out c/ (validação e invalidação de tokens)
- [ ] Refresh tokens para manter o usuário logado
- [ ] Possibilidade de usuários criarem artigos