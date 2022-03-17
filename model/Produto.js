const mongoose = require('mongoose')

//Criação do Schema Cadastro
const ProdutoSchema = mongoose.Schema({
    nome: {
        type: String,
        unique: true //Cria um indice unico
    },
    status: {
        type: String,
        enum: ['ativo', 'inativo'],
        default: 'ativo'
    }
}, {timestamps: true} ) //Mostra a data e hora da alteração

module.exports = mongoose.model('produto', ProdutoSchema)