const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  userName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  names:{
    type: String,
    required: true
  },
  paternalSurname:{
    type: String,
    required: true
  },
  maternalSurname:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: false
  },
  role:{
    type: String,
    enum : ['ADMIN', 'OPERADOR', 'DESARROLLADOR'],
    default : 'OPERADOR'
  },
  permissions:{
    type: [String], 
    enum: ['CREAR', 'LEER', 'ACTUALIZAR','ELIMINAR','COPIAR','ACTIVAR'],
    default: 'LEER'
  },
  active:{
    type:Boolean,
    default:false
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });

  
module.exports = mongoose.model('User', userSchema);
