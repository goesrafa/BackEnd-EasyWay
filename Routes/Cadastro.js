const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Cadastro = require('../model/Cadastro')

/********************************
 * Listagem dos cadastros
 * GET /cadastro
 ********************************/
router.get('/', async(req, res)=> {
   
})