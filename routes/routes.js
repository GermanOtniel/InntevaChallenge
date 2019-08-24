const express = require('express');
const router  = express.Router();
const User    = require('../models/User');



// 1) Servicio que permita la creación de un nuevo usuario 
// donde se vincule a un rol y al menos un permiso.

router.post('/newuser',(req,res) => {
  User.find({$or:[{email:req.body.email},{userName:req.body.userName}]})
    .then( existingUser => {
      if(!existingUser[0]){
        User.create(req.body)
          .then(newUser => {
            res.json({
              succes:true,
              newUser: newUser
            })
          })
          .catch( e => {
            res.send({
              err:e,
              succes:false
            })
          })
      }
      else if(existingUser[0]){
        res.send({
          succes:false,
          reason: 'USER EXISTS',
          existingUser: existingUser[0]
        })
      }
    })
    .catch( e => {
      res.send({
        err:e,
        success:false
      })
    })
})

// 2) Servicio que liste todos los usuarios existentes.

router.get('/allusers',(req,res)=>{
  User.find()
  .then(users=>{
      res.json({
        succes:true,
        allUsers: users
      });
  })
  .catch(e=>{
      res.send({
        err:e,
        succes:false
      })
  })
})


// 3) Servicio que liste todos los usuarios que pertenezcan a un rol determinado, 
// por ejemplo obtención del listado de los usuarios que sean operadores.
router.get('/usersrole',(req,res)=>{
  // EL ROL LO PODEMOS TRAER POR MEDIO DE QUERY
  let roleQuery = req.query.role;
  // POR MEDIO DEL BODY 
  let roleBody  = req.body.role;
  // O ESTABLECIDO POR DEFAULT 
  let roleDefault = 'OPERADOR'

  // EN ESTE CASO TRAEMOS LOS USUARIOS QUE PERTENECEN AL ROL 'OPERADOR'
  User.find({role:roleDefault})
    .then( users => {
      res.json({
        succes: true,
        users: users
      });
    })
    .catch( e => {
      res.send({
        succes:false,
        err: e
      })
    })
}) 

// 4) Servicio que permita listar los usuarios que cuenten con algún permiso en particular, 
// ejemplo los usuarios que tengan el permiso 'Activar'.

router.get('/userspermissions',(req,res)=>{
  let permissionQuery = req.query.permission;
  let permissionBody = req.body.permission;
  let permissionDefault = 'LEER'
  User.find({permissions:permissionDefault})
    .then( users => {
      res.json({
        succes: true,
        users: users
      });
    })
    .catch( e => {
      res.send({
       succes:false,
       err: e
      })
    })
})

// 5) Servicio que permita listar a todos aquellos usuarios activos.

router.get('/usersactives',(req,res)=>{
  User.find({active:true})
    .then( users => {
      res.json({
        succes: true,
        usersActives: users
      });
    })
    .catch( e => {
      res.send({
       succes:false,
       err: e
      })
    })
})


// 6) Servicio que permita listar a todos aquellos usuarios inactivo

router.get('/usersinactives',(req,res)=>{
  User.find({active:false})
    .then( users => {
      res.json({
        succes: true,
        usersInactives: users
      });
    })
    .catch( e => {
      res.send({
       succes:false,
       err: e
      })
    })
})

// 7) Servicio que permita la actualización de un usuario.

router.post('/userupdate/:id',(req,res)=>{
  let idUser = req.params.id;
  let newData = req.body;
  User.findByIdAndUpdate(idUser, newData , {new:true})
    .then( user => {
      res.json({
        succes: true,
        userUpdated:user});
    })
    .catch( e => {
      res.send({
        succes: false,
        err: e
      })
    });
});

// 8) Servicio que permita visualizar la información de un usuario dado su identificador.

router.get('/user/:id' ,(req,res)=>{
  let userId = req.params.id;
  User.findById(userId)
    .then(user=>{
      res.json({
        succes:true,
        user:user
      });
    })
    .catch( e => {
      res.send({
        succes: false,
        err: e
      })
    })
});


// 9) Servicio que permita la eliminación de un usuario.

router.delete('/userdelete/:id',(req,res,next)=>{
  let idParams = req.params.id
  User.findOneAndRemove({_id:idParams})
    .then(user=>{
      res.json({
        succes:true,
        userDeleted:user
      })
    })
    .catch(e=>{
      res.send({
        succes:false,
        err:e
      })
    })
})

module.exports = router;
