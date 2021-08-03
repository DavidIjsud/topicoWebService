import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class ValidateCuentaDTO{

            @IsNumber()
            @IsNotEmpty()
            ci:number;

            @IsEmail()
            @IsNotEmpty()
            email : string;

            @IsString()
            @IsOptional()
            mensaje : string;

}