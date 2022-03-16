const express = require('express')
 //Carregando a variavel

const app = express()
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

app.listen(PORT, (req, res) =>{
    //Iniciando a porta
    console.log(`Servidor iniciadona porta ${PORT}`)
})
