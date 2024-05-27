import { Request, Response } from "express";
import { UserRepo } from "../../repositories/interfaces/UserRepo";
import { authenticatedRequest } from "../../middlewares/jwtAuth";

export async function getMe(request: authenticatedRequest, response: Response, repo: UserRepo) {
    console.log(request.userId);
    const userDetails = await repo.getById(request.userId!);
    response.status(userDetails ? 200 : 404).json(userDetails);
}