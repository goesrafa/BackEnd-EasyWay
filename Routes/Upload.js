const express = require('express')
const router = express.Router()
const multer = require('multer')

//Definição da pasta padrão (o multer não salva a extensão do arquivo)
const upload = multer({
    dest: './public/uploads'
})

/****************************************
 * Processo do upload de uma imagem
 * POST /
*****************************************/

router.post('/', upload.array('file'), async(req, res) =>{
    console.log(`Arquivos recebidos:  ${req.files.length}`)
    const statusUpload = req.files.length > 0 ? true : false
    res.send({
        upload: statusUpload,
        files: req.files
    })
})
module.exports = router