import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Especialidades } from "src/enums/especialidades";


export class EspecialidadDTO{

            @IsEnum(Especialidades)
            @IsNotEmpty()
            nombre: string;

}