import { IsDate, IsDateString, IsEmail, IsEnum, isNumber, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Persona } from "src/entities/Persona";
import { Rol } from "src/enums/roles";


export class CuentaDTO {

      @IsEmail()
      email: string;
      
      @IsDate()
      @IsOptional()
      fechaCreacion : Date;

      @IsString()
      contrasena : string;

      @IsEnum( Rol )
      tipoCuenta : Rol;

      @IsNumber()
      persona: number

      @IsOptional()
      @IsNumber()
      pin : number;

}