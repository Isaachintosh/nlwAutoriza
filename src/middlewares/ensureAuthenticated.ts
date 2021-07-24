import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}


export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    
    // Receber o token;
    const authToken = request.headers.authorization
    
    // Validar se token está preenchido
    if(!authToken) {
        return response.status(401).end();
    }
    
    // Tratar o token recebido, separando o titulo do hash
    const [, token] = authToken.split(" ");
    
    try {
        // Auditar se o token é válido
        const { sub } = verify(token, "6ea481bd89f957334877c7a46f21de55") as IPayload;
        
        // Recuperar informações do usuário
        request.user_id = sub;

    } catch (err) {
        return response.status(401).end();
    }
    
    


    return next();
}

