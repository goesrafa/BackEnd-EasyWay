const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Criando o Schema do cadastro
const CadastroSchema = mongoose.Schema({
    nome: {type: String, unique: true},
    status: {type: String, enum: ['ativo', 'inativo'], default: 'ativo'},
    foto: {
            orignalname: {type: String},
            path: {type: String}, //salvamento do caminho
            size: {type: Number},
            mimetype: {type: String}
    },
    peso: {type: String},
    descricao: {type: String},
    categoria: {type: Schema.Types.ObjectId, ref: 'produto'},
    preco: {type: String}
}, {timestamps: true})
module.exports = mongoose.model('cadastro', CadastroSchema)