const express = require("express")
const router = express.Router()

const {sucess, fail} = require("../helpers/resposta")
const DiscDAO = require("../model/Disc")



router.get("/:id", (req, res) => {

    DiscDAO.getById(req.params.id).then(disc =>
    {
        res.json(sucess(disc))
    }
    
    ).catch(err =>
    {
        consol.elog(err)
        res.status(404).json(fail("Você não faz essa matéria! Ou ela não existe!"))
    })
})

router.get("/", (req, res) => {

    DiscDAO.list().then((discs) =>
    {
        res.json(sucess(discs, "list"))
    })
})


router.post("/", (req, res) => {
    
    const {nome, prof, periodo} = req.body

    DiscDAO.save(nome, prof, periodo).then
    (disc =>
    {
        res.json(sucess(disc))
    }
    ).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha a salvar tal disciplina :( "))
    })
})

router.put("/:id", (req, res) => {
    
    const {id} = req.params
    const {nome, prof, periodo} = req.body

    let obj = {}
    if (nome) obj.nome = nome
    if (prof) obj.prof = prof
    if (periodo) obj.periodo = periodo
    
    if (obj == {}) 
    {
        return res.status(404).json(fail("Nenhum atributo foi modificado"))
    }

    DiscDAO.update(id, obj).then(disc => {
        if (disc)
            res.json(sucess(disc))
        else
            res.status(500).json(fail("Materia não encontrada"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao alterar tal materia"))
    })
})

router.delete("/:id", (req, res) => {
    
    DiscDAO.delete(req.params.id).then
    (disc => 
    {
        if (disc)
            res.json(sucess(disc))
        else
            res.status(500).json(fail("Não encontrado"))
    }
    ).catch(err => 
    {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir"))
    }
    )
})

module.exports = router