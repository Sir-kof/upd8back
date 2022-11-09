# Modificar váriaveis de âmbiente que estão em src/main/config/env.ts para fazer a conexão com o banco de dados e a porta de acesso

Rotas do CRUD:

http://localhost:{env.port}/api/user CREATE - Cria um cadastro

http://localhost:{env.port}/api/user/:cpf READ - Retorna um perfil por vez

http://localhost:{env.port}/api/user/:cpf UPDATE - Edita um cadastro já existente

http://localhost:{env.port}/api/user/:cpf DELETE - Deleta um cadastro

Todas rotas feitas utilizando o banco de dados mysql
