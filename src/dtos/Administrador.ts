import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { PersonaDTO } from "src/dtos/persona.dto";
import { Rol } from "../enums/roles";



export class AdministradorDTO extends PersonaDTO{

      @IsEnum(Rol)  
      rol : Rol;
      

      @IsString()
      contrato : string;

      

}

