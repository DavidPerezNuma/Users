import { usersService } from "#services/users.service.js";
import { Router } from "express";
import { idUserSchema, createUserSchema, updateUserSchema } from "../middlewares/users.dto.js";
import { validatorHandler } from "#middlewares/validator.handler.js";

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await usersService.getAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', validatorHandler(idUserSchema, 'params'), async (req, res, next) => {
    try {
        const user = await usersService.getById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.post('/', validatorHandler(createUserSchema, 'body'), async (req, res, next) => {
    try {
        const newUser = await usersService.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    } });

router.put('/:id', validatorHandler(idUserSchema, 'params'), validatorHandler(updateUserSchema, 'body'), async (req, res, next) => {
    try {
        const updatedUser = await usersService.update(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', validatorHandler(idUserSchema, 'params'), async (req, res, next) => {
    try {
        await usersService.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;