# ProtoSim

Prototipo Simples e uma aplicacao para tramitacao de protocolo entre entidades(representados por enderecos) de forma distribuida, utilizando o blockchain.

## Requisitos

- Node e npm (http://nodejs.org)
- Multichain (http://multichain.com)

## Instalacao

1. Executar o comando para criar o blockchain: multichain-util create protocolo
2. Alterar as propriedades abaixo do arquivo ~/.multichain/protocolo/params.dat
anyone-can-connect = true 
anyone-can-send = true 
anyone-can-receive = true 
anyone-can-issue = true
3. Copiar a porta rpc listada no fim do arquivo para ser inserida na propriedade 'port' dos passos seguintes.
4. Executar o multichain: multichaind protocolo -daemon -rpcuser='usr' -rpcpassword='pss'
5. Clonar o repositorio: `git clone git@github.com:rodrigovilela/protosim`
6. Dentro da pasta do protosim, executar o comando: 'npm install'
7. Editar os arquivos do diretorio protosim: ./server.js e ./app/routes.js substituindo as linhas inicias correspontes ao trecho abaixo com port, user e pass do blockchain criado:
var multichain = require("multichain-node")({
    port: 6792,
    host: 'localhost',
    user: 'usr',
    pass: 'pss'
})
8. Inciar o node: `nodejs server.js`

## Executando o ProtoSim

1. Copiar os enderecos impressos no console, parecidos com os apresentados abaixo:
(
1DNLjvm9wVpiqEchkKUyqGhEkrEiPygDVGofHU
1V5QnYano25WqBXTTFFRqw3aBVXycTwsRaDkmW
) 
2. Acessar via browser o endereco 'http://localhost:8080'
3. Informar o primeiro endereco no primeiro campo
4. Informar o segundo endereco no segundo campo
5. Informar o NUP(normalmente do tipo 00000.000000/0000-00)
6. Informar o Assunto e clicar em Enviar
7. Neste momento o NUP informado foi tramitado para o segundo endereco
8. Para visualizar, informe o segundo endereco no primeiro campo
9. Ao sair do campo, a caixa de entrada com os NUPs recebidos sera exibida.

 
## Observacoes

Para futuras evolucoes ficara a inclusao da possiblidade de anexar o arquivo correspondente ao numeros de protocolo(NUP) tramitado entre os enderecos do blockchain. Neste momento, o multichain ainda nao suporta cadeias longas de informacao. Isto dificultou o desenvolvimento pretendido durante a fase de prototipacao da ferramenta, sendo necessario reduzir o escopo para um registro de NUP tramitado entre os orgaos(enderecos).