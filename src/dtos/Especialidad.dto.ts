import { IsNotEmpty, IsString } from "class-validator";


export class EspecialidadDTO{

            @IsString()
            @IsNotEmpty()
            nombre: string;

}