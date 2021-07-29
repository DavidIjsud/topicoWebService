import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString, minLength } from "class-validator";


export class PersonaDTO {
     
  @IsString()
  @IsNotEmpty()
    ci : number;

  @IsString(  )
  @IsNotEmpty()
   apellidos: string;

  @IsString()
  @IsNotEmpty()
   foto : string;
  

  @IsString()
  @IsNotEmpty()
   nombres : string; 

   @IsString()
   @IsNotEmpty()
   telefono : number;

  
}