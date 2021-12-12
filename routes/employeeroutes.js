var express = require("express");
const { where } = require("sequelize/dist");
var route = express.Router();
const db=require('../orm/db.config')
var model = require('../orm/model')
const {
   Sequelize,
   Model,
   DataTypes
} = require('sequelize');
route.post("/employees", async function (request, response) {
    const { username } = request.body
    try {
    const result = await model.employee.findAll({ where: { wfm_manager: username, lockstatus: "not_requested" } })   
    response.json(result)
   }
   catch (e) {
      console.log(e)
      response.status(500)
   }
})

route.post("/employeeswithskill", async function (request, response) {
   const { username } = request.body
   try { 
         // var attributes = ['employee_id', 'name', 'bar.manager','manager','wfm_manager', ['skills.name']];

         var result = await model.employee.findAll({
            where: { wfm_manager: username},
            // attributes: attributes,
            // raw: true,
            include: [
              {
                 model: model.skillmap,
                 as: 'skillmaps',
                 attributes: {
                  exclude: ['skillid']
                 },
                 include: [
                  {
                     model: model.skills,
                     as: 'skills',
                     attributes: ['name']
                  }
                ]  
              }
            ]
          }
          );
        
         response.json(result)
  }
  catch (e) {
     console.log(e)
     response.status(500)
  }
})

// route.post("/employeeswithskill", async function (request, response) {
//    const { username } = request.body
//    try { 

//          var result = await model.employee.findAll({
//             where: { wfm_manager: username},
//             include: [
//               {
//                  model: model.skillmap,
//                  as: 'skillmaps',
//                  include: [
//                   {
//                      model: model.skills,
//                      as: 'skills',
//                   }
//                 ]  
//               }
//             ]
//           });
        
//          response.json(result)
//   }
//   catch (e) {
//      console.log(e)
//      response.status(500)
//   }
// })

route.post("/skills", async function (request, response) {
   const { empId } = request.body
   try {
    var s =  model.skillmap.hasMany(model.skillmap, {foreignKey: 'skillid'})
model.employee.belongsTo(model.employee, {foreignKey: 'employee_id'})

const result = await model.employee.findAll({ where: { employee_id: empId}, include: [model.skillmap]})
   // const result = await model.skills.findAll({ where: { employee_id: empId } })   
   response.json(result)
  }
  catch (e) {
     console.log(e)
     response.status(500)
  }
})

route.post("/updatesoftlock", async function (request, response) {
   const { lockID, empID, reqMsg } = request.body
   try {
      const result = await model.softlock.update(
        { requestmessage: reqMsg,
          status: request.body.status,
          lastupdated: Date.now(),
          mgrlastupdate: Date.now(),
        },
        { where: { lockid: lockID } }
      )
      response.send("Request lock message updated")

    } catch (err) {
      response.status(500)
   }
})

route.post("/addsoftlock", async function (request, response) {
   try{
      const { manager, empId, reqMsg } = request.body
      const result = await model.softlock.create({
         employee_id: empId,
         manager: manager,
         reqdate: Date.now(),
         lastupdated: Date.now(),
         requestmessage: reqMsg,
         status: 'waiting'
     })
     .then(function (data) {
        console.log("success")
         if (data) {
             response.send("Data inserted");
         } else {
             response.status(400).send('Error in insert new record');
         }
     });
   }
   catch(err){
      response.status(500)
   }  
})


module.exports = route