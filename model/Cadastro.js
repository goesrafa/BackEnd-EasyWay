const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Criando o Schema do cadastro
const CadastroSchema = mongoose.Schema({
    nome: {type: String, unique: true},
    foto: {
            orignalname: {type: String},
            path: {type: String}, //salvamento do caminho
            size: {type: Number},
            mimetype: {type: String}
    },
    peso: {type: String},
    descricao: {type: String},
    preco: {type: Number}
}, {timestamps: true})
module.exports = mongoose.model('cadastro', CadastroSchema)