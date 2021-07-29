import { IsEmail, IsInt,  Max, Min } from "class-validator";



export class PinDTO{

    @IsInt()
    @Min(4)
    @Max(4)
    pin: number;    
    

}