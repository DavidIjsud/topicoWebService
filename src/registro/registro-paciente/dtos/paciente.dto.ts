import { IsOptional, IsString } from "class-validator";
import { PersonaDTO } from "./persona.dto";


export class PacienteDTO extends PersonaDTO{

       @IsString()
       @IsOptional()
       seguro: string;     

}