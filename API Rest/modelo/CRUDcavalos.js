const express = require("express");
const server = express();
const router = express.Router();
server.use(express.json({extended:true}));
const fs = require('fs');

// Leitura
const pegaData = () =>
{
    const mostra = fs.readFileSync('details/cavalos.json', 'utf-8');
    return JSON.parse(mostra);
};

const leitura = () =>
{
    const mostra2 = pegaData();
    return mostra2;
};

const gravacao = (id, nome, cor) =>{
  
    let atual = [];
    atual = pegaData();
    atual.cavalos.push({ id, nome, cor }); 
    fs.writeFileSync("./details/cavalos.json", JSON.stringify(atual), "utf-8");
    
    return true;

}

const editar = (id, nome, cor) => {
    
    let atual = pegaData();
  
    const cavalodoID = atual.cavalos.findIndex((cavalos) => cavalos.id === id);
        
    if (cavalodoID === -1){
        return false;
    } else{

        const { nome: cNome, cor: cCor } = atual.cavalos[cavalodoID];
        
        const newCavalo = {
            nome: nome ? nome : cNome,
            cor: cor ? cor : cCor
        };
    
        atual.cavalos[cavalodoID] = newCavalo;

        fs.writeFileSync("./details/cavalos.json", JSON.stringify(atual), "utf-8");
        return true;  

    }

  };

const excluir = (id) => {

    let atual = pegaData();
  
    const cavalodoID = atual.cavalos.findIndex((cavalos) => cavalos.id === id);
  
    if (cavalodoID === -1)
    {
      return false;

    }else{
        
      atual.cavalos.splice(cavalodoID, 1);
  
      fs.writeFileSync("./details/cavalos.json", JSON.stringify(atual), "utf-8");
      return true;
    }
}; 

module.exports = {
    leitura,
    gravacao,
    editar,
    excluir
};


