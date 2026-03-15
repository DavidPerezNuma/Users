import Joi from 'joi';

export const createUserSchema = Joi.object({   
    nombre: Joi.string().min(1).max(100).required(),
    edad: Joi.number().integer().min(0).max(120).optional(),
    cargo: Joi.string().min(1).max(100).required(),
    pais: Joi.string().min(1).max(100).required(),
    experiencia: Joi.number().integer().min(0).max(60).optional(),
    tecnologias: Joi.array().items(Joi.string().min(1)).optional()
});

// Para actualizar (todos opcional excepto si lo requieres)
export const updateUserSchema = Joi.object({   
    nombre: Joi.string().min(1).max(100).optional(),
    edad: Joi.number().integer().min(0).max(120).optional(),
    cargo: Joi.string().min(1).max(100).optional(),
    pais: Joi.string().min(1).max(100).optional(),
    experiencia: Joi.number().integer().min(0).max(60).optional(),
    tecnologias: Joi.array().items(Joi.string().min(1)).optional()
});

export const idUserSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});