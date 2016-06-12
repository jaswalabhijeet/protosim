var multichain = require("multichain-node")({
    port: 6792,
    host: 'localhost',
    user: 'usr',
    pass: 'pss'
})

//Definicao Documento Full
function DocumentoFull(nup, ass, rem, des, dat) {
    this.nup = nup;
    this.ass = ass;
    this.rem = rem;
    this.des = des;
    this.dat = dat;
}

//string to hexa convert 
function d2h(d) {
    return d.toString(16);
}

function h2d (h) {
    return parseInt(h, 16);
}

function strToHex (tmp) {
    var str = '',
        i = 0,
        tmp_len = tmp.length,
        c;
 
    for (; i < tmp_len; i += 1) {
        c = tmp.charCodeAt(i);
        str += d2h(c) + ' ';
    }
    return str;
}

function hexToStr(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function getTodos(req, res) {

    var destinatario = req.body.origem;

    multichain.listAddressTransactions({address: destinatario}, (err, todos) => {

        if (todos) {

            var resposta = [];

            for (var i = 0; i < todos.length; i++) {
                var dataSTR = hexToStr(todos[i].data);

                if (dataSTR.indexOf('nup') > 0) {
                    var documento = JSON.parse(dataSTR);

                    //restringe apenas as transacoes cujo destinario eh o endereco da caixa de entrada
                    if (documento.des == destinatario) {
                        resposta.push(documento);
                    }
                }
            };
            //ordena a caixa de entrada
            resposta = resposta.sort(function(a,b){return a.dat-b.dat});
            resposta = resposta.reverse();
        }        

        res.json(resposta);
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all
    app.get('/api/documentos', function (req, res) {
        //getTodos(req, res);
    });
 
    app.post('/api/entrada', function (req, res) {
        getTodos(req, res);
    });

    // create and send back all after creation
    app.post('/api/documentos', function (req, res) {

        var origem = req.body.origem;
        var destino = req.body.destino;

        var documento = new DocumentoFull(
            req.body.nup, req.body.assunto, 
            origem, destino, Date.now());
      
        var strObj = JSON.stringify(documento)
        //console.log('jsonStrObj: ', strObj);
        var strHex = strToHex(strObj);  
        //console.log('strHexobj: ', strHex);

        multichain.sendWithMetadataFrom({from: origem, to: destino, amount: 0.0, data: strHex}, (err, resm) => {
            if(err){
                console.log(err);
            }
            //console.log(resm);
            getTodos(req, res);
        })

    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};