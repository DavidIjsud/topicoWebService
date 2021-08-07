import { IsEnum, IsIn, IsInt, IsNotEmpty, IsNumberString, IsObject, IsString } from "class-validator";
import { Especialidad } from "src/entities/Especialidad";
import { Rol } from "src/enums/roles";
import { PersonaDTO } from "src/dtos/persona.dto";
import { EspecialidadDTO } from "./Especialidad.dto";

export class MedicoDTO extends PersonaDTO {

    @IsString()
    contrato : string;

    @IsString()
    cv : string;

    @IsString()
    fotoTituloProfesional: string;

    @IsString()
    @IsNotEmpty()
    especialidade : string;

    @IsNumberString()
    numeroMatricula : number;

    @IsEnum(Rol)
    rol : Rol;

}