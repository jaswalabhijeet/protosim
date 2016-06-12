# ProtoSim

Prototipo Simples é uma aplicação para tramitação de protocolo entre entidades(representadas por endereços) de forma distribuida, utilizando o multichain.

## Requisitos

- Node e npm (http://nodejs.org)
- Multichain (http://www.multichain.com/download-install)

## Instalação

1. Executar o comando para criar o blockchain: multichain-util create protocolo
2. Alterar as propriedades abaixo do arquivo ~/.multichain/protocolo/params.dat
(anyone-can-connect = true, 
anyone-can-send = true, 
anyone-can-receive = true, 
anyone-can-issue = true)
3. Copiar a porta rpc listada no fim do arquivo para ser inserida na propriedade 'port' dos passos seguintes.
4. Executar o multichain: multichaind protocolo -daemon -rpcuser='usr' -rpcpassword='pss'
5. Clonar o repositorio: 'git clone git@github.com:rodrigovilela/protosim'
6. Dentro do diretório do protosim, executar o comando: 'npm install'
7. Editar os arquivos do diretório protosim: ./server.js e ./app/routes.js substituindo as linhas inicias correspontes ao trecho abaixo com port, user e pass do blockchain criado:
var multichain = require("multichain-node")({
    port: 6792,
    host: 'localhost',
    user: 'usr',
    pass: 'pss'
})
8. Inciar o node: `nodejs server.js`

## Executando o ProtoSim

1. Copiar os endereços impressos no console, parecidos com os apresentados abaixo:
(
15F3WHhetnB9ZsdPrFUDkqk7MLsgYprrHcgKmv,
1FUEJW4i2TsVJ24K8ViKt9EqAE9W3Ztcnm8h7H
) 
2. Acessar via browser o endereço 'http://localhost:8080'
3. Informar o primeiro endereço no primeiro campo
4. Informar o segundo endereço no segundo campo
5. Informar o NUP(normalmente do tipo 00000.000000/0000-00)
6. Informar o Assunto e clicar em Enviar
7. Neste momento o NUP informado foi tramitado para o segundo endereço
8. Para visualizar, informe o segundo endereço no primeiro campo
9. Ao sair do campo, a caixa de entrada com os NUPs recebidos será exibida.
10. A partir daí, pode-se enviar tramitar entre os endereços informados.

 
## Observações

Para futuras evoluções ficará a possiblidade de anexar o arquivo correspondente ao número de protocolo(NUP) tramitado entre os endereços do blockchain. Neste momento, o multichain ainda não suporta cadeias longas de informaço. Isto dificultou o desenvolvimento pretendido durante a fase de prototipação da ferramenta, sendo necessário reduzir o escopo para um registro de NUP tramitado entre os endereços.