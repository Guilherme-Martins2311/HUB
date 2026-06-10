  ## Rodar o código

  Executar `npm install` para instalar todas a dependencias.

  Executar `npm run dev` para inicializar o servidor.

  Os comandos devem ser executados dentro da pasta backend e frontend.
  
  ### Crie um arquivo `.env`
  
  Na raiz do projeto:
  
  ```env
  PORT=3001
  
  DB_HOST=seu_host
  DB_PORT=sua_porta
  DB_USER=seu_usuario
  DB_PASSWORD=sua_senha
  DB_NAME=hub_fibra
  ```
  
  > ⚠️ O arquivo `.env` não é versionado por conter credenciais sensíveis. Para rodar o projeto, solicite as credenciais do banco ao responsável pelo servidor Railway.
  
  ## ⚠️ Aviso sobre o Banco de Dados
  
  O banco de dados MySQL está hospedado no Railway no plano gratuito.
  Caso o serviço esteja indisponível, é necessário recriar o ambiente localmente:
  
  1. Instale o MySQL localmente
  2. Crie um banco chamado `hub_fibra`
  3. Execute o script de criação das tabelas disponível no repositório:
     https://github.com/PauloVMA07/hub-fibra-bd
  4. Atualize o arquivo `.env` com as credenciais locais
