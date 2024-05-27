import { Request, Response } from "express";
import { UpdateResult, UserRepo } from "../../repositories/interfaces/UserRepo";

import { Responses } from "../router";
import { authenticatedRequest } from "../../middlewares/jwtAuth";

const responses: Responses = {
    [UpdateResult.SUCESS]: ["User updated", 200],
    [UpdateResult.INVALID_USER]: ["User does not exist", 404],
    [UpdateResult.INVALID_UPDATE]: ["Invalid new value", 400],
    [UpdateResult.DATABASE_ERROR]: ["Something went wrong", 500],
}

export async function postUpdate(request: authenticatedRequest, response: Response, repo: UserRepo) {
    const updateType = request.query.field;
    const value = request.body.newValue;
    if (!["username", "password"].includes(updateType as string)) {
        response.status(404).json({ message: "Invalid field" });
        return;
    }
    let result;
    if (updateType === "username") {
        result = await repo.updateUsername(request.userId!, value);
    }
    if (updateType === "password") {
        result = await repo.updatePassword(request.userId!, value);
    }
    const [message, statusCode] = responses[result!];
    response.status(statusCode).json({ message, code: result });
}
