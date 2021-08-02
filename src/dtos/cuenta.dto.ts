import { IsDate, IsDateString, IsEmail, IsEnum, isNumber, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Persona } from "src/entities/Persona";


export class CuentaDTO {

      @IsEmail()
      email: string;
      
      @IsDate()
      @IsOptional()
      fechaCreacion : Date;

      @IsString()
      contrasena : string;

      @IsNumber()
      persona: number

      @IsOptional()
      @IsNumber()
      pin : number;

}