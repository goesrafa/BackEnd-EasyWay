const mongoose = require('mongoose')

//Criação do Schema Cadastro
const ProdutoSchema = mongoose.Schema({
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
}, {timestamps: true} ) //Mostra a data e hora da alteração

module.exports = mongoose.model('produto', ProdutoSchema)