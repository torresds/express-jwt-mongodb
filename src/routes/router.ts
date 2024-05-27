import { Router } from "express";
import { getMe } from "./user/me";
import { MongoDBUserRepo } from "../repositories/UserRepo";
import { MongoClient } from "mongodb";
import { postNew } from "./user/new";
import { postUpdate } from "./user/update";


export type Responses = {
    [key: number]: [string, number],
}

export const UserRouter = (client: MongoClient) => {
    const router = Router();
    const UserRepo = new MongoDBUserRepo("db", "users", client);
    router.get("/me", (req, res) => getMe(req, res, UserRepo));
    router.post("/new", (req, res) => postNew(req, res, UserRepo));
    router.get("/update", (req, res) => postUpdate(req, res, UserRepo));
    return router;
}
