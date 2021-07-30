import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";


export class MedicoValidate{

        @IsNumber()
        @IsNotEmpty()
        ci:number;

        @IsEmail()
        @IsNotEmpty()
        email:string;

}