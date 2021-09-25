import { getCustomRepository } from "typeorm";

import { compare } from "bcryptjs";

import { UserRepositories } from "../repositories/UserRepositories";

import { sign } from "jsonwebtoken";




interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
  
    async execute({ email, password }: IAuthenticateRequest){
       const usersRepositories = getCustomRepository(UserRepositories);

       // Verificar se email existe
       const user = await usersRepositories.findOne({
           email
       });

       if(!user) {

           throw new Error("Email/Password incorrect")
       }
        // verificar se senha está correta
       const passwordMatch = await compare(password, user.password);

       if(!passwordMatch) {

        throw new Error("Email/Password incorrect")

       }

        //Gerar token
        const token = sign({
            email: user.email
        }, "123456", {     /* Simulado a chave privada */
            subject: user.id,
            expiresIn: "1d"
        }
        );
        return token;

    }
}



export { AuthenticateUserService }