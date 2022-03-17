const express = require('express')
require('dotenv').config() //Carregando a variavel
const InicializaMongoServer = require('./config/Db')
//Iniciando o servidor MongoDB
InicializaMongoServer()

//Definição das rotas da aplicação
const rotasProduto = require('./Routes/Produto')
const rotaUpload = require('./Routes/Upload')


const app = express()

//Por segurança remover
app.disable('x-powered-by')

//Porta DEFAULT
const PORT = process.env.PORT

//Middleware do Express
app.use(function(reqq, res, next){
    //Em produção, remova  o * e atualize para o seu dominio/id do seu app
    res.setHeader('Access-Control-Allow-Origin', '*')
    //Cabeçalhos permitdos
    res.setHeader('Access-Control-Allow-Headers', '*') //Todos
    //Métodos permitidos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
    next()
})




//Conteúdo JSON
app.use(express.json())

app.get('/', (req, res) => {
    const idiomas = req.headers['accept-language']
    res.json({mensagem: "API 100% funcional",
                    versao: '1.0.0'})
})
/*Rotas do cadastro dos produtos */
app.use('/produtos', rotasProduto)

/*Rotas do conteúdo público */
app.use('/public', express.static('public'))
/*Rota Upload*/
app.use('/upload', rotaUpload)

/*Rota para exceções - 404  (sempre ser a ultima rota*/
app.use(function(req, res){
    res.status(404).json({message: `A rota ${req.originalUrl} não existe`})
})

 //Iniciando a porta
app.listen(PORT, (req, res) =>{
    console.log(`Servidor iniciado na porta ${PORT}`)
})
