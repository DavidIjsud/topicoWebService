import { IsEnum, IsIn, IsInt, IsString } from "class-validator";
import { Especialidad } from "src/entities/Especialidad";
import { Rol } from "src/enums/roles";
import { PersonaDTO } from "src/dtos/persona.dto";

export class MedicoDTO extends PersonaDTO {

    @IsString()
    contrato : string;

    @IsString()
    cv : string;

    @IsString()
    fotoTituloProfesional: string;

    @IsInt()
    numeroMatricula : number;

    @IsEnum(Rol)
    rol : Rol;

    especialidad : Especialidad

}