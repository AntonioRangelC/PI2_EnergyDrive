# EnergyDrive

Este readme tem como objetivo mostrar as configurações principais para rodar o projeto em ambiente local, além de linkar as principais tecnologias utilizadas. 

## Passo a passo rodar local

1. Certifique-se que a versão do node bate com as dependências do projeto:
```
package.json -> engine -> node -> version
```

2. Inicie configurando as variáveis de ambiente do projeto no arquivo `.env.local` copiando o `.env.example`, comando:
```
mv .env.example .env.local
```

3. Libere o whitelist de seu IP no mongoose acessando através de: `https://cloud.mongodb.com/`

4. Para rodar o projeto:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Para acessar o projeto:

```
Abrir http://localhost:3000
```

## Tutorial para adicionar o bot do Telegram e receber notificações
- Pesquisar @notificacoesEngergyDrive_bot no Telegram
- Clicar no botão ```/start```
- Rodar o projeto (o bot só irá mandar notificações depois do login na plataforma)
- Fazer login no EnergyDrive
- Digitar o comando ```/chatId``` no bot e enviar
- Copiar o chatId e colar na variável ```TELEGRAM_CHAT_ID_APISTATUS``` dentro do arquivo .env.local
- O bot está pronto para enviar notificações para seu Telegram

## Tecnologias

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Mongo DB](https://cloud.mongodb.com/) - Docs mongo DB
