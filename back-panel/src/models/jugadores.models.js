import mongoose from "mongoose";

const jugadoresCollection = "jugadores"

const jugadorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "ID es requerido"]
  },
  nombre: {
    type: String,
    required: [true, "Nombre es requerido"]
  },
  usuario: {
    type: String,
    unique: true,
    required: [true, "Usuario es requerido"]
  },
  password: {
    type: String,
    required: [true, "Password es requerido"]
  },
  telefono: {
    type: Number,
    unique: true,
    required: [true, "Teléfono es requerido"]
  },
  ingreso: {
    type: String,
    required: [true, "Ingreso es requerido"]
  },
  movimientos: {
    cargas: {
        type: Array,
      },
      retiros: {
        type: Array,
      }
  },
  puntos: {
    type: Number,
    default: 0
  },
  partidas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mesas"
  }],
  grupo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'grupos',
    required: [true, "Grupo es requerido"]
}],
  saldo:{
    type: Number,
    default: 0
  }
});

export const jugadoresModel = mongoose.model(jugadoresCollection, jugadorSchema);
