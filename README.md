## 🚀 Preparando o Ambiente

* É necessario ter o [NodeJS](https://nodejs.org/en/download/current/) na versão **16.9x** ou superior.
* Após baixar/clonar o repositório, use o comando `npm install` para instalar todas as dependências.
* Modifique a extensão do arquivo `.env.example` deixando apenas `.env`, então insira o ***token*** do seu bot no mesmo.

```yaml
TOKEN=token-do-bot
PREFIX=.
```

* Se você fez corretamente, agora é só usar o comando `npm start` que o seu bot deverá ficar online.

## 💡 Observações
* O bot está configurado para usar um servidor ***lavalink*** público totalmente funcional, mas caso queira modificar para inserir o seu próprio, será necessário alterar o seguinte arquivo:
```
├── 📁 music-bot
|  └── 📁 src
|     └── 📁 structures
|        └── 📄 BaseManager.ts
```
* Insira os campos abaixos de acordo com suas necessidades:
```
{
    host: 'lava.link',
    port: 80,
    password: 'password',
    secure: false
}
```