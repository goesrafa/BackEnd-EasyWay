const express = require('express')
const router = express.Router()
const Categoria = require('../model/Categoria')

/********************************
 * Listagem das categorias do curso
 * GET /categorias
 ********************************/
router.get('/', async(req, res) => {
    try{
        const categorias = await Categoria.find({"status":"ativo"}).sort({nome: 1}) //O equivalente ao "SELECT * FROM "no mongodb
        res.json(categorias)
    }catch(err){
        //status 500 - erro do lado do servidor
        res.status(500).send({ 
            errors: [{message: 'Não foi possível obter as categorias existentes'}]
        }) 
    }
})

module.exports = router