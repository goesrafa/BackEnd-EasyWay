const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Cadastro = require('../model/Cadastro')


/********************************
 * Listagem dos cadastros
 * GET /cadastro
 ********************************/
router.get('/', async(req, res)=> {
   try{
       const cadastro = await  Cadastro.find({"status":"ativo"}).sort({nome:1})
       res.json(cadastro)
   }catch(err){
       res.status(500).send({
           errors: [{message: 'Não foi possível obter a lista de cadastro'}]
       })
   }
})

/********************************
 * Lista apenas um cadstro pelo id
 * GET /cadastro/:id
 ********************************/
router.get('/:id', async(req, res)=>{
    try{
        const cadastro = await Cadastro.findById(req.params.id)
        res.json(cadastro)
    }catch(err){
        res.status(500).send({
            errors: [{message: `Não foi possível obter o cadastro pelo id ${req.params.id}`}]
        })
    }
})

/********************************
 * Incluir um novo cadastro
 * POST /cadastros
 ********************************/
const validaCadastro = [
    check('nome').not().isEmpty().withMessage("Nome obrigatório"),
    check('preco').isNumeric().withMessage('O preço informado deve ser apenas número')
    .isFloat({min:0}).withMessage('O preço deve ser a partir de 0'),
    check('descricao').not().isEmpty().withMessage("A descrição do produto é obrigatória"),
]
router.post('/', validaCadastro, async(req, res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {nome} = req.body
    let cadastro = await Cadastro.findOne({nome})
    if(cadastro)
        return res.status(200).json({
            errors: [{message: 'Cadastro já existente'}]
        })
        try{
            let cadastro = new Cadastro(req.body)
            await cadastro.save()
            res.send(cadastro)
        }catch(err){
            return res.status(500).json({
                errors: [{message: `Erro ao salvar o cadastro: ${err.message}`}]
            })
        }
})

/******************************
  * Remover um cadastro
  * DELETE /cadstro/:id
  *******************************/
 router.delete(':id', async(req, res)=>{
     await Cadastro.findByIdAndRemove(req.params.id)
     .then(cadastro=>{
         res.send({message: `Cadastro ${cadstro.nome} removido`})
     }).catch(err =>{
         return res.status(500).send({
             errors: [{message: `Não foi possível apagar o cadastro com id: ${req.params.id}`}]
         })
     })
 })

  /******************************
  * Edita um cadastro
  * PUT /cadastros
  *******************************/
router.put('/', validaCadastro, 
    async(req,  res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Cadastro.findByIdAndUpdate(req.body._id, {
        $set: dados
    }, {new: true})
    .then(cadastro =>{
        res.send({message: `Cadastro ${cadastro.nome} alterado com sucesso`})
    }).catch(err => {
        return res.status(500).send({
            errors: [{message: `Não foi possível alterar o cadastro com o id ${req.body._id}`}]
        })
    })
})

module.exports = router