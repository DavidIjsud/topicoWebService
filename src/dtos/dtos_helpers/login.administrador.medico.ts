import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class LoginAdministradorMedicoDTO {
 
         @IsEmail()
         @IsNotEmpty()
         email: string;
         
         @IsNotEmpty()
         @IsString()
         contrasena: string;

}