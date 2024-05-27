import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface authenticatedRequest extends Request {
    userId?: string;
}

interface Payload {
    userId: string
}

export async function verifyJWT(request: authenticatedRequest, response: Response, next: NextFunction) {
    const token = request.headers.authorization;
    console.log(token)
    if (!token) {
        return response.status(400).json({ message: "Missing authentication" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as Payload;
        request.userId = decoded.userId;
        next();
    } catch (_) {
        return response.status(401).json({ message: "Invalid token" });
    }
}