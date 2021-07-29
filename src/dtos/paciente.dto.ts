import { IsDate, IsDateString, IsOptional, IsString } from "class-validator";
import { PersonaDTO } from "./persona.dto";


export class PacienteDTO extends PersonaDTO{

       @IsString()
       @IsOptional()
       seguro: string;     

       @IsString()
       @IsOptional()
       gruposanguineo: string;

       @IsDateString()
       fechaNacimiento: Date;

}