module.exports = app => {
    const proyectos = require("../controllers/proyectos.controller.js");
  
    var router = require("express").Router();
    
    const upload = require('../config/multer');
    const cloudinary = require("cloudinary").v2;
    var fs = require('fs');

    const db = require('../models');
    const CloudUser = db.cloud_user;
    const Proyectos = db.proyectos;

    cloudinary.config({
      cloud_name: 'tresideambipi',
      api_key: '735689747739288',
      api_secret: 'oPjl3NwlqAmOIWewUnbc01Jt8Jc',
      secure: true
    });
  
    // Create a new Proyectos
    router.post("/", proyectos.create);
  
    // Retrieve all Proyectos
    router.get("/", proyectos.findAll);
  
    // Retrieve all active Proyectos
    router.get("/active", proyectos.findAllActive);
    
    //dashboard
    router.get("/byUsuario/:id/:correo", proyectos.dashboard);
  
    // Retrieve a single Proyectos with id
    router.get("/:id", proyectos.findOne);
  
    // Update a Proyectos with id
    //router.put("/:id", proyectos.update);
router.put('/:id', upload.single('file'), async (req, res)=>{
  try{
    const result = await cloudinary.uploader.upload(req.file.path)
    //Crea una instancia de cloud_user
    let cloud_user = {
      name: 'Logo-'+req.params.id,
      secure_url: result.secure_url,
      cloudinary_id: result.public_id
    };

    console.log('cloud_user', cloud_user);
    console.log('parametros',req.params);

    await CloudUser.create(cloud_user).then(cloud =>{
      console.log('cloud:',cloud);
      
      const id = req.params.id;
      let data

      typeof req.body.data == 'string' ? data = JSON.parse(req.body.data) : data = req.body

      let proyectos = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        aplicacion_tipo: data.aplicacion_tipo,
        proyecto_tipo_id: data.proyecto_tipo_id,
        logo_id: cloud.dataValues.id
      };

      Proyectos.update(proyectos, {where: { id: id} }).then(pr =>{
          res.send({
            message: `Proyecto with id=${req.params.proyecto_id} was updated successfully.`, cloud_id: cloud.dataValues.id
          });

      }).catch(err => {
          res.status(500).send({
          message: "Error creating ProyectoRecurso. Error:"+err.message
          });
      });

    }).catch(err => {
        res.status(500).send({
        message: "Error creating CloudUser. Error:"+err.message
        });
    });
    
  } catch(err) {
    console.log(err)
  }
})


    // Update the members of Proyectos with id
    router.put("/updateMembers/:id", proyectos.updateMembers);

    // Delete the member of Proyectos with id
    router.delete("/deleteMember/:id", proyectos.deleteMember);

    // Update the status of Proyectos with id
    router.put("/updateStatus/:id", proyectos.updateStatus);

    // Update the etapa of Proyectos with id
    router.put("/updateEtapa/:id", proyectos.updateEtapa);
    
    // Update the etapa metas of Proyectos with id
    router.put("/updateEtapaMeta/:id", proyectos.updateEtapaMeta);

    // Update the etapa preguntas of Proyectos with id
    router.put("/updateEtapaPreguntas/:id", proyectos.updateEtapaPreguntas);

    // Update the etapa Necesidades of Proyectos with id
    router.put("/updateEtapaNecesidades/:id", proyectos.updateEtapaNecesidades);

    // Update the etapa Objetivos of Proyectos with id
    router.put("/updateEtapaObjetivos/:id", proyectos.updateEtapaObjetivos);
    
    // Update the etapa propositos of Proyectos with id
    router.put("/updateEtapaPropositos/:id", proyectos.updateEtapaPropositos);
    
    // Update the etapa acciones of Proyectos with id
    router.put("/updateEtapaAcciones/:id", proyectos.updateEtapaAcciones);
    
    // Update the etapa metricas of Proyectos with id
    router.put("/updateEtapaMetricas/:id", proyectos.updateEtapaMetricas);
    
    // Update the etapa problema of Proyectos with id
    router.put("/updateEtapaProblema/:id", proyectos.updateEtapaProblema);
    
    // Update the etapa clientes of Proyectos with id
    router.put("/updateEtapaClientes/:id", proyectos.updateEtapaClientes);
    
    // Update the etapa solucion of Proyectos with id
    router.put("/updateEtapaSolucion/:id", proyectos.updateEtapaSolucion);
    
    // Update the etapa metricas clave of Proyectos with id
    router.put("/updateEtapaMetricasClave/:id", proyectos.updateEtapaMetricasClave);
    
    // Update the etapa propuesta of Proyectos with id
    router.put("/updateEtapaPropuesta/:id", proyectos.updateEtapaPropuesta);
    
    // Update the etapa ventajas of Proyectos with id
    router.put("/updateEtapaVentajas/:id", proyectos.updateEtapaVentajas);
    
    // Update the etapa canales of Proyectos with id
    router.put("/updateEtapaCanales/:id", proyectos.updateEtapaCanales);
    
    // Update the etapa estructura of Proyectos with id
    router.put("/updateEtapaEstructura/:id", proyectos.updateEtapaEstructura);
    
    // Update the etapa flujo of Proyectos with id
    router.put("/updateEtapaFlujo/:id", proyectos.updateEtapaFlujo);

    // Update the etapa bosquejar of Proyectos with id
    router.put("/updateEtapaBosquejar/:id", proyectos.updateEtapaBosquejar);

    // Update the etapa mapa calor of Proyectos with id
    router.put("/updateEtapaMapaCalor/:id", proyectos.updateEtapaMapaCalor);

    // Update the etapa bosquejar voto of Proyectos with id
    router.put("/updateEtapaBosquejarVoto/:id", proyectos.updateEtapaBosquejarVoto);

    // Update the etapa mapa of Proyectos with id
    router.put("/updateEtapaMapa/:id", proyectos.updateEtapaMapa);

    // Update the notacp of Proyectos with id
    router.put("/updateNotaCp/:id", proyectos.updateNotaCp);

    // Update the metalp of Proyectos with id
    router.put("/updateMetaLp/:id", proyectos.updateMetaLp);

    // Update the preguntasprint of Proyectos with id
    router.put("/updatePreguntaSprint/:id", proyectos.updatePreguntaSprint);

    // Update the mapaux of Proyectos with id
    router.put("/updateMapaUx/:id", proyectos.updateMapaUx);

    // Update the Necesidades of Proyectos with id
    router.put("/updateNecesidades/:id", proyectos.updateNecesidades);

    // Update the Propositos of Proyectos with id
    router.put("/updatePropositos/:id", proyectos.updatePropositos);

    // Update the Objetivos of Proyectos with id
    router.put("/updateObjetivos/:id", proyectos.updateObjetivos);

    // Update the Acciones of Proyectos with id
    router.put("/updateAcciones/:id", proyectos.updateAcciones);

    // Update the Metricas of Proyectos with id
    router.put("/updateMetricas/:id", proyectos.updateMetricas);

    // Update the Problema of Proyectos with id
    router.put("/updateProblema/:id", proyectos.updateProblema);

    // Update the Clientes of Proyectos with id
    router.put("/updateClientes/:id", proyectos.updateClientes);

    // Update the Solucion of Proyectos with id
    router.put("/updateSolucion/:id", proyectos.updateSolucion);

    // Update the metricas_clave of Proyectos with id
    router.put("/updateMetricasClave/:id", proyectos.updateMetricasClave);

    // Update the Propuesta of Proyectos with id
    router.put("/updatePropuesta/:id", proyectos.updatePropuesta);

    // Update the Ventajas of Proyectos with id
    router.put("/updateVentajas/:id", proyectos.updateVentajas);

    // Update the Canales of Proyectos with id
    router.put("/updateCanales/:id", proyectos.updateCanales);

    // Update the Estructura of Proyectos with id
    router.put("/updateEstructura/:id", proyectos.updateEstructura);

    // Update the flujo of Proyectos with id
    router.put("/updateFlujo/:id", proyectos.updateFlujo);

    // Update the mapaCalor of Proyectos with id
    router.put("/updateMapaCalor/:id", proyectos.updateMapaCalor);

    // Update the mapa calor of Proyectos with id
    router.put("/updateBosquejarVoto/:id", proyectos.updateBosquejarVoto);

    // Create the NotaCp of Proyectos with id
    router.post("/createNotaCp", proyectos.createNotaCp);

    // Create the MetaLp of Proyectos with id
    router.post("/createMetaLp", proyectos.createMetaLp);

    // Create the PreguntaSprint of Proyectos with id
    router.post("/createPreguntaSprint", proyectos.createPreguntaSprint);
    
    // Create the Necesidades of Proyectos with id
    router.post("/createNecesidades", proyectos.createNecesidades);

    // Create the propositos of Proyectos with id
    router.post("/createPropositos", proyectos.createPropositos);

    // Create the Objetivos of Proyectos with id
    router.post("/createObjetivos", proyectos.createObjetivos);

    // Create the Acciones of Proyectos with id
    router.post("/createAcciones", proyectos.createAcciones);

    // Create the Metricas of Proyectos with id
    router.post("/createMetricas", proyectos.createMetricas);
    
    // Create the Problema of Proyectos with id
    router.post("/createProblema", proyectos.createProblema);
    
    // Create the Clientes of Proyectos with id
    router.post("/createClientes", proyectos.createClientes);
    
    // Create the Solucion of Proyectos with id
    router.post("/createSolucion", proyectos.createSolucion);
    
    // Create the propuesta of Proyectos with id
    router.post("/createPropuesta", proyectos.createPropuesta);
    
    // Create the ventajas of Proyectos with id
    router.post("/createVentajas", proyectos.createVentajas);
    
    // Create the Canales of Proyectos with id
    router.post("/createCanales", proyectos.createCanales);
    
    // Create the estructura of Proyectos with id
    router.post("/createEstructura", proyectos.createEstructura);
    
    // Create the flujo of Proyectos with id
    router.post("/createFlujo", proyectos.createFlujo);
    
    // Create the MetricasClave of Proyectos with id
    router.post("/createMetricasClave", proyectos.createMetricasClave);

    // Create the Mapa Calor of Proyectos with id
    router.post("/createMapaCalor", proyectos.createMapaCalor);

    // Create the Bosquejar Voto of Proyectos with id
    router.post("/createBosquejarVoto", proyectos.createBosquejarVoto);

    // Update the time of Proyectos with id
    router.put("/updateTime/:id", proyectos.updateTime);

    // Update the time pass of Proyectos with id
    router.put("/updateTimePass/:id", proyectos.updateTimePass);
  
    // Delete a Proyectos with id
    router.delete("/:id", proyectos.delete);
    
    // Delete the notacp of Proyectos with id
    router.delete("/deleteNotaCp/:id", proyectos.deleteNotaCp);
    
    // Delete the metalp of Proyectos with id
    router.delete("/deleteMetaLp/:id", proyectos.deleteMetaLp);
    
    // Delete the preguntasprint of Proyectos with id
    router.delete("/deletePreguntaSprint/:id", proyectos.deletePreguntaSprint);
    
    // Delete the Necesidades of Proyectos with id
    router.delete("/deleteNecesidades/:id", proyectos.deleteNecesidades);
  
    // Delete the propositos of Proyectos with id
    router.delete("/deletePropositos/:id", proyectos.deletePropositos);
    
    // Delete the Objetivos of Proyectos with id
    router.delete("/deleteObjetivos/:id", proyectos.deleteObjetivos);

    // Delete the Acciones of Proyectos with id
    router.delete("/deleteAcciones/:id", proyectos.deleteAcciones);

    // Delete the Metricas of Proyectos with id
    router.delete("/deleteMetricas/:id", proyectos.deleteMetricas);

    // Delete the Problema of Proyectos with id
    router.delete("/deleteProblema/:id", proyectos.deleteProblema);

    // Delete the Clientes of Proyectos with id
    router.delete("/deleteClientes/:id", proyectos.deleteClientes);

    // Delete the Solucion of Proyectos with id
    router.delete("/deleteSolucion/:id", proyectos.deleteSolucion);

    // Delete the metricas_clave of Proyectos with id
    router.delete("/deleteMetricasClave/:id", proyectos.deleteMetricasClave);

    // Delete the Propuesta of Proyectos with id
    router.delete("/deletePropuesta/:id", proyectos.deletePropuesta);

    // Delete the Ventajas of Proyectos with id
    router.delete("/deleteVentajas/:id", proyectos.deleteVentajas);

    // Delete the Canales of Proyectos with id
    router.delete("/deleteCanales/:id", proyectos.deleteCanales);

    // Delete the estructura of Proyectos with id
    router.delete("/deleteEstructura/:id", proyectos.deleteEstructura);

    // Delete the flujo of Proyectos with id
    router.delete("/deleteFlujo/:id", proyectos.deleteFlujo);

    // Delete the mapa calor of Proyectos with id
    router.delete("/deleteMapaCalor/:id", proyectos.deleteMapaCalor);

    // Delete the bosquejar voto of Proyectos with id
    router.delete("/deleteBosquejarVoto/:id", proyectos.deleteBosquejarVoto);

    // Create a new Proyectos
    router.delete("/", proyectos.deleteAll);
  
    app.use('/api/proyectos', router);
  };