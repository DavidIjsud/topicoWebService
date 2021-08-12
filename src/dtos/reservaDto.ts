import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class ReservaAddDTO{

        @IsString()
        @IsNotEmpty()
        fecha : string;

        @IsString()
        @IsNotEmpty()
        hora: string;

        @IsInt()
        @IsNotEmpty()
        paciente : number;

        @IsInt()
        @IsNotEmpty()
        medico : number;
        

}