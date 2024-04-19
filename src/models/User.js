import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema ({
    username: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String, // Ahora es opcional
    },
    img:{
        type: String, // Ahora es opcional
    },
    direccion: {
        type: String, // Ahora es opcional
    },
    roles: [{
        ref:"Role",
        type: Schema.Types.ObjectId
    }]
 }, {
    versionKey: false
 });

userSchema.statics.encryptPassword = async(password) => {    
    try {
        const salt = await bcryptjs.genSalt(10);
        return await bcryptjs.hash(password, salt);
    } catch (error) {
        throw new Error ('Failed to hash the password');
    }
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcryptjs.compare(password, receivedPassword);
}

export default model ("User", userSchema);
