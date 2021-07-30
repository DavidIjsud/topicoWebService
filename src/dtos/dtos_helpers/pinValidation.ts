import { IsEmail, IsNotEmpty, IsNumber, isNumberString, IsNumberString, IsString } from "class-validator";

export class PinValidationDTO{

        @IsNumber()
        @IsNotEmpty()
        public pin: number;

        @IsNumber()
        @IsNotEmpty()
        public ci : number;

        @IsEmail()
        @IsNotEmpty()
        public email: string;

}