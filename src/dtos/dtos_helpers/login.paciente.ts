import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";


export class LoginPacienteDTO{

        @IsNumber()
        @IsNotEmpty()
        ci: number;  
        
        @IsEmail()
        @IsNotEmpty()
        email: string;

}