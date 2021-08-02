import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";


export class LoginAdministradorMedicoDTO {
 
         @IsEmail()
         @IsNotEmpty()
         email: string;
         
         @IsNotEmpty()
         @IsNumber()
         ci: number;

}