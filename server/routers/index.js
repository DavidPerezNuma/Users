import user from "./users.router.js";
import express from "express";
import healtCheck from "./healthCheck.router.js";

function RouterApi(app){
    const router = express.Router();
    app.use('/api/v1', router);


    router.use('/users', user);
    router.use('/health', healtCheck);
}

export {RouterApi};