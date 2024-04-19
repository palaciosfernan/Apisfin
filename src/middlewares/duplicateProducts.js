import mongoose from 'mongoose';
import Product from '../models/Products'; // Asegúrate de que estés importando el modelo correcto

export const validateFields = async (req, res, next) => {
    const requiredFields = ['name', 'img1', 'img2', 'img3', 'img4', 'color', 'descripcion', 'precio', 'categoria', 'tamaño', 'temporada', 'genero'];
    const errorsMessage = {};

    for (const field of requiredFields) {
        if (!req.body[field]) {
            errorsMessage[field] = `The ${field} is required`;
        }
    }

    if (Object.keys(errorsMessage).length > 0) {
        return res.status(400).json(errorsMessage);
    }

    next();
};


export const verifyDuplicate = async (req, res, next) => {
    try {
        const { name, descripcion, precio, categoria, tamaño, temporada, genero } = req.body;

        // Buscar si existe un producto con las mismas características
        const isDuplicate = await Product.findOne({
            name: name,
            descripcion: descripcion,
            precio: precio,
            categoria: categoria,
            tamaño: tamaño,
            temporada: temporada,
            genero: genero
        });

        if (isDuplicate) {
            // Si existe un producto con las mismas características, retornar un error 409
            return res.status(409).json({ message: "Ya existe un producto con las mismas características" });
        }

        // Si no hay duplicados, continuar con la siguiente función de middleware
        next();
    } catch (error) {
        // Si ocurre algún error durante la búsqueda del producto, retornar un error 500
        return res.status(500).json({ message: "Error al buscar el producto" });
    }
};
