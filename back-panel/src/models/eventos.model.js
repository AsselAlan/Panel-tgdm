import mongoose from "mongoose";

const eventosCollection = "eventos"

const eventosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: [true, "Nombre es requerido"],
        unique: true
    },
    grupo:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "grupos"
    }],
    categoria:{
        type: String,
        enum: ['mam', 'tor', 'camp'],
        require: [true, "Categoria es requerido"]
    },
    color:{
        type: String,
        require: [true, "Color es requerido"]
    },
    jugadores: {
        type: Number,
        require: [true, "Cantidad de jugadores es requerido"]
    },
    entrada:{
        type: Number,
        require: [true, "Entrada es requerido"]
    },
    premio:{
        type: Number,
        require: [true, "Premio es requerido"]
    },
    puntos:{
        type: Number,
        require: [true, "Puntos es requerido"]
    },
    comicion:{
        type: Number,
        require: [true, "Comicion es requerido"]
    },
    descripcion:{
        type: String,
    }
});

export const eventosModel = mongoose.model(eventosCollection, eventosSchema);