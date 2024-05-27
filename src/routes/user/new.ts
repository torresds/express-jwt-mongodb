import { Request, Response } from "express";
import { InsertUserResult, UserRepo } from "../../repositories/interfaces/UserRepo";
import { Responses } from "../router";

const responses: Responses = {
    [InsertUserResult.USERNAME_EXISTS]: ["Username already registred", 400],
    [InsertUserResult.SUCESS]: ["User created", 200],
    [InsertUserResult.DATABASE_ERROR]: ["Something went wrong", 500],
    [InsertUserResult.INVALID_PASSWORD]: ["Password must contain at least 8 characters", 400],
    [InsertUserResult.INVALID_USERNAME]: ["Username must contain at least 3 characters", 400],
}

export async function postNew(request: Request, response: Response, repo: UserRepo) {
    const { username, password } = request.body  || {};
    const result = await repo.create({ username, password, _id: "" });
    const [message, statusCode] = responses[result];
    response.status(statusCode).json({ message, code: result });
}