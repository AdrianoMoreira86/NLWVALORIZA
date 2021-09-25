import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}


export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){
    // Receber o token
    const authToken = request.headers.authorization;
   

    
    // Validar se token está preenchido
    if(!authToken) {
        return response.status(401).end()
    }

    // Validar se token é válido
    const [,token]  = authToken.split(" ")
    
    try {
        const { sub } = verify(token ,"123456") as IPayload;

        request.user_id = sub;
        
        return next();

    } catch (error) {
        return response.status(401).end()
    }
    
}


