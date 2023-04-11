const express = require("express");
const server = express();
const router = express.Router();
server.use(express.json({extended:true}));
const fs = require('fs');
const { leitura, gravacao, editar, excluir } = require('./modelo/CRUDcavalos.js');


router.get("/", (req, res) =>{

    res.send(leitura());

})

// Gravação
router.post("/", (req, res) =>{   
    
    const { id, nome, cor } = req.query;

    if(gravacao(id, nome, cor) == true)
    {
      res.send("Cadastro realizado!");
    }

});

//Editar
router.put("/", (req, res) =>{

  const {id} = req.query;
  const {nome, cor } = req.query;

  if(editar(id, nome, cor) == true){
    res.send("Finalizado!");
  }

});

//Excluir
router.delete("/", (req, res) =>{

  const {id} = req.query;

  if(excluir(id) == true){
    res.send("Finalizado! Cavalo excluido!");
  }

});


server.use(router);

server.listen(3003, () => {
    console.log("Rodando!...")
})