import mongoose from "mongoose";

const gruposSchema = new mongoose.Schema({
  fechaCreacion: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    unique: true,
    require: [true, "Nombre es requerido"]
  },
  representante: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuarios',
    maxlength: 1
  }],
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuarios',
    maxlength: 3
  }],
  jugadores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jugadores'
  }]
})

export const gruposModel = mongoose.model('grupos', gruposSchema);

