import mongoose from "mongoose";

const userCollection = "usuarios"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: [true, "Name es requerido"]
    },
    password:{
        type: String,
        require: [true, "Password es requerido"]
    },    
    email:{
        type: String,
        require: [true, "Password es requerido"]
    },    
    telefono: {
        type: Number,
        unique: true,
    },
    rol: {
        type: String,
        enum: ['agente', 'representante', 'admin'],
        required: true
    },
    grupo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'grupos'
    }],
    fechaCreacion: {
        type: String,
        required: true
    },
    comicion: {
        type: Array,
    },
    partidascreadas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mesas'
    }],
});

userSchema.index({ name: 1 , password: 1});

export const userModel = mongoose.model(userCollection, userSchema);