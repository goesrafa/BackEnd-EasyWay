const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')



const Produto = require('../model/Produto')

/********************************
 * Listagem dos produtos 
 * GET /produtos
 ********************************/
router.get('/', async(req, res) => {
    try{
        const produto = await Produto.find({"status":"ativo"}).sort({nome: 1}) //O equivalente ao "SELECT * FROM "no mongodb
        res.json(produto)
    }catch(err){
        //status 500 - erro do lado do servidor
        res.status(500).send({ 
            errors: [{message: 'Não foi possível obter os produtos existentes'}]
        }) 
    }
})

/********************************
 * Lista apenas um produto pelo id
 * GET /produtos/:id
 ********************************/
 router.get('/:id', async(req, res) => {
    try{
        const produto = await Produto.findById(req.params.id)
        res.json(produto)
    }catch(err){
        //status 500 - erro do lado do servidor
        res.status(500).send({ 
            errors: [{message: `Não foi possível obter o produto com o id ${req.params.id}`}]
        }) 
    }
})

/********************************
 * Incluir um novo produto
 * POST /produtos
 ********************************/
const validaProduto = [
    check('nome').not().isEmpty().withMessage("Nome obrigatório"),
    check('preco').isNumeric().withMessage('O preço informado deve ser apenas número')
    .isFloat({min:0}).withMessage('O preço deve ser a partir de 0'),
    check('descricao').not().isEmpty().withMessage("A descrição do produto é obrigatória"),
]

 router.post('/ ',validaProduto,  async(req, res) => { 
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const{ nome } = req.body
        let produto = await Produto.findOne({nome})
        if(produto)
            return res.status(200).json({
                errors: [{message: 'Produto já existente'}]
            })
            try{
                let produto = new Produto(req.body)
                await produto.save()
                res.send(produto)
            }catch(err){
                return res.status(500).json({
                    errors :[{message: `Erro ao salvar o produto: ${err.message}`}]
                })
            }
 })

 /******************************
  * Remover um produto
  * DELETE /produtos/:id
  *******************************/
 router.delete('/:id', async(req, res) => {
     await Produto.findByIdAndRemove(req.params.id)
     .then(produto =>{
         res.send({message:`Produto ${produto.nome} removido com sucesso`})
     }).catch(err =>{
         return res.status(500).send({
        errors: [{message: `Não foi possível apagar o produto com o id: ${req.params.id}`}]
         })
     })
 })

  /******************************
  * Edita um produto
  * PUT /produtos
  *******************************/
router.put('/', validaProduto, 
    async(req,  res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Produto.findByIdAndUpdate(req.body._id, {
        $set: dados
    }, {new: true})
    .then(produto =>{
        res.send({message: `Produto ${produto.nome} alterado com sucesso`})
    }).catch(err => {
        return res.status(500).send({
            errors: [{message: `Não foi possível alterar o produto com o id ${req.body._id}`}]
        })
    })
})

module.exports = router