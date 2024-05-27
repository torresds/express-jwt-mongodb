import { Request, Response } from "express";
import { UserRepo } from "../../repositories/interfaces/UserRepo";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export async function postLogIn(request: Request, response: Response, repo: UserRepo) {
    const { username, password } = request.body || {};
    if (!username || !password) {
        return response.status(404).json({ message: "Missing username/password" });
    }
    const userData = await repo.getByUsername(username);
    if (!userData) {
        return response.status(404).json({ message: "User does not exist" });
    }
    const isPasswordEqual = await compare(password, userData.password);
    const token = jwt.sign({ userId: userData._id }, process.env.SECRET_KEY!, {
        expiresIn: "1h"
    });
    if (isPasswordEqual) {
        return response.status(200).send({ token });
    } else {
        return response.status(401).json({ error: "Invalid password" });
    }
}