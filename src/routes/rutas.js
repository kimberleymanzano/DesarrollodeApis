const { Router } = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = Router();

const planta = require("./data.json");
console.log(planta);

//const express = require('express');
//const router = express.Router();

router.get('/',(req,res)=>{
    res.json(planta);
});


//sacar toda la info desde un ID
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    console.log(id);

    planta.forEach(plantita => {
        if(plantita.id == id){
            res.json(plantita);
            console.log(plantita.title);
        }
    });
});

//sacar humedad mínima ya registrada
router.get('/humedadminima/:id',(req,res)=>{
    const {id} = req.params;
    const {Humedadminima} = req.params;
    console.log(Humedadminima);

    planta.forEach(plantita => {
        if(plantita.id == id){
            res.send("humedad minima de "+ plantita.title + " es: "+ plantita.Humedadminima);

            console.log(plantita.title);
            console.log(plantita.Humedadminima);
        }
    });
});

//sacar Minerales mínimo ya registrado
router.get('/mineralesminimo/:id',(req,res)=>{
    const {id} = req.params;
    const {mineralesminimo} = req.params;
    console.log(mineralesminimo);

    planta.forEach(plantita => {
        if(plantita.id == id){
            res.send("El mínimo de minerales que debe tener: "+ plantita.title + " es de: "+ plantita.mineralesminimo);

            console.log(plantita.title);
            console.log(plantita.mineralesminimo);
        }
    });
});

//sacar humedad "actual"
router.get('/humedadactual/:id',(req,res)=>{
    const {id} = req.params;
    const {HumedadActual} = req.params;
    console.log(HumedadActual);

    planta.forEach(plantita => {
        if(plantita.id == id){
            res.send("La humedad actual de "+ plantita.title + " es: "+ plantita.HumedadActual
            +", para referencia, la humedad de esta planta debe ser mayor a: "+plantita.Humedadminima);

            console.log(plantita.title);
            console.log(plantita.HumedadActual);
        }
    });
});

//sacar Minerales "actual"
router.get('/mineralesactual/:id',(req,res)=>{
    const {id} = req.params;
    const {MineralesActual} = req.params;
    console.log(MineralesActual);

    planta.forEach(plantita => {
        if(plantita.id == id){
            res.send("La humedad actual de "+ plantita.title + " es: "+ plantita.MineralesActual
            +", para referencia, el mínimo de minerales que esta planta debería tener es mayor a: "+plantita.MineralesActual);

            console.log(plantita.title);
            console.log(plantita.MineralesActual);
        }
    });
});

//sacar últimas veces de riego
router.get('/ultimoriego/:id',(req,res)=>{
    const {id} = req.params;
    const {UltimosRiegos} = req.params;
    console.log(UltimosRiegos);

    planta.forEach(plantita => {
        if(plantita.id == id){
            res.send("Las últimas 3 veces que la planta "+ plantita.title + " fue regada: "+ plantita.UltimosRiegos);

            console.log(plantita.title);
            console.log(plantita.UltimosRiegos);
        }
    });
});

//Riego entre fechas
router.get('/riegoentrefechas/:id',(req,res)=>{
    const {id} = req.params;
    const {Vecesregada} = req.params;
    const {fechas} = req.params;
    console.log(id);
    const {riego} = req.params;
    
    planta.forEach(plantita => {
        if(plantita.id == id){

            res.send("Entre las fechas: "+plantita.fechas+", la planta "+ plantita.title +" se ha regado: "
            + plantita.Vecesregada + " veces en estos horarios: "+plantita.riego);

            console.log(plantita.title);
            console.log(plantita.riego);
        }
    });
});



router.post('/',(req,res)=>{
    const {title, Humedadminima, mineralesminimo} = req.body;
    console.log(title);

    if(title && Humedadminima && mineralesminimo){
        const id = planta.length + 1;

        const nuevaplanta = {...req.body, id};
        
        //console.log(nuevaplanta);

        planta.push(nuevaplanta);
        res.status(200).json(planta);

        res.send("OH YEAH");
    }else{
        res.status(500).json({error:'no data'});
    }

    res.send("ok");
})

module.exports = router;