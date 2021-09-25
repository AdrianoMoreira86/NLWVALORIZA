import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AutenticateUserService";


class AuthenticateUserController {
    async handle(requeste: Request, response: Response) {
        const { email, password } = requeste.body;

        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({
            email,
            password,
        });
        return response.json(token);
    }
}

export { AuthenticateUserController }