import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString, minLength } from "class-validator";


export class PersonaDTO {
     
  @IsInt()
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

   @IsInt()
   @IsNotEmpty()
   telefono : number;

  
}