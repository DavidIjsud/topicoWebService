import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class LoginPacienteDTO{

        @IsString()
        @IsNotEmpty()
        password: number;  
        
        @IsEmail()
        @IsNotEmpty()
        email: string;

}