import mongoose from "mongoose";

const mesasCollection = "mesas"

const mesasSchema = new mongoose.Schema({
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "grupos"
    },
    evento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "eventos"
    },
    jugadores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jugadores"
    }],
    estado: {
        type: Boolean,
        require: [true, "Estado es requerido"]
    },
    ganador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jugadores"
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios"
    },
    day:{
        type: String,
        require: [true, "Day es requerido"]
    },
    time:{
        type: String,
        require: [true, "Time es requerido"]
    },

});

export const mesasModel = mongoose.model(mesasCollection, mesasSchema);