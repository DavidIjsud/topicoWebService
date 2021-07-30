import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, minLength } from "class-validator";


export class PersonaDTO {
 ///ok    
  @IsString()
  @IsNotEmpty()
    ci : number;

  @IsString(  )
  @IsNotEmpty()
   apellidos: string;

  @IsString()
  @IsOptional()
   foto : string;
  

  @IsString()
  @IsNotEmpty()
   nombres : string; 

   @IsNumberString()
   @IsNotEmpty()
   telefono : number;

  
}