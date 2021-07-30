import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PersonaDTO } from "src/dtos/persona.dto";
import { Rol } from "../enums/roles";



export class AdministradorDTO extends PersonaDTO{

      @IsEnum(Rol)  
      rol : Rol;
      

      @IsString()
      @IsOptional()
      contrato : string;

      

}

