const express = require('express')
require('dotenv').config() //Carregando a variavel
const InicializaMongoServer = require('./config/Db')
//Iniciando o servidor MongoDB
InicializaMongoServer()

//Definição das rotas da aplicação
const rotasProduto = require('./Routes/Produto')


const app = express()

//Por segurança remover
app.disable('x-powered-by')

//Porta DEFAULT
const PORT = process.env.PORT
//Conteúdo JSON
app.use(express.json())

app.get('/', (req, res) => {
    //pacote de idiomas
    const idiomas = req.headers['accept-language']
    res.json({mensagem: "API 100% funcional",
                    versao: '1.0.0'})
})
/*Rotas  */
app.use('/produtos', rotasProduto)


app.listen(PORT, (req, res) =>{
    //Iniciando a porta
    console.log(`Servidor iniciado na porta ${PORT}`)
})
