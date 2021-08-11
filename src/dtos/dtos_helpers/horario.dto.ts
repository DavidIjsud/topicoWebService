import { IsNotEmpty, IsNumber } from "class-validator";


export class HorarioDTO{

    @IsNumber()
    @IsNotEmpty()
    ci : number;

    @IsNumber()
    @IsNotEmpty()
    idDia : number;

    @IsNumber()
    @IsNotEmpty()
    idHora : number;

}