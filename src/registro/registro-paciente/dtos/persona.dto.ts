import { IsBoolean, IsInt, IsNotEmpty, IsString, minLength } from "class-validator";


export class PersonaDTO {
     
  @IsInt()
  @IsNotEmpty()
   private ci : number;

  @IsString(  )
  @IsNotEmpty()
  private apellidos: string;

  @IsString()
  @IsNotEmpty()
  private foto : string;

  @IsString()
  @IsNotEmpty()
  private nombres : string; 

  
}