const mongoose = require('mongoose')

const MONGOURI = process.env.MONGODB_URL

const InicializaMongoServer = async() =>{
    try{
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true, //Utilização do ultimo Parse de URL (versão mais nova)
            useCreateIndex: true, //Sendo necessário, cria indices
            useFindAndModify: false, //Padrão sempre é encontrar os registros e alterar os mesmo
            useUnifiedTopology: true, //Utiliza a engine para descoberta de servidores
        })
        console.log("Conexão com o MongoDB")
    } catch(e){
        console.error(e)
        throw e // Mostra o erro com detalhe
    }
}

module.exports = InicializaMongoServer