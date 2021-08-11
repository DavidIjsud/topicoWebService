import { IsBoolean, IsInt, IsNotEmpty } from "class-validator";

export class DeleteHoraDTO{

        @IsInt()
        @IsNotEmpty()
        horarioId : number;

        @IsInt()
        @IsNotEmpty()
        diaId : number;

        @IsBoolean()
        @IsNotEmpty()
        estado: boolean

        @IsInt()
        @IsNotEmpty()
        ciMedico : number;

}