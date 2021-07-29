import { Body, Controller, Get, HttpException, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Paciente } from 'src/entities/Paciente';
import { editFileName, ErrorException, imageFileFilter, NotSuccessMessageJson, SuccessMessageJson } from 'src/shared/helper.shared';
import { PacienteDTO } from '../../dtos/paciente.dto';
import { ServiceCuentaService } from '../registro-cuenta/services/service-cuenta.service';
import { RegistroPacienteServiceService } from './services/registro-paciente-service.service';
import { diskStorage } from 'multer';
import * as multerGoogleStorage from 'multer-google-storage';



@Controller('registro/paciente')
export class RegistroPacienteControllerController {

      constructor(private registroPacienteService: RegistroPacienteServiceService,
                   private cuentaService : ServiceCuentaService  
        ){}
    
       @Get('getall')
        async getAll( @Res() res : Response    ) {
            let lista:Paciente[]  = [];
               try {
                 lista = await this.registroPacienteService.getAllPacientes();
               } catch (error) {
                   throw new HttpException(error.message, 500); 
                   
               }

             return  res.status(200).json({
                    "status" : "success",
                    "message" : "Data found",
                    "data" : lista
               });

        }

      @Post('add/:email')
      @UseInterceptors(
          FilesInterceptor( 'image', 3, {
              storage : diskStorage({
                  destination: './files',
                  filename : editFileName
              }),
              fileFilter : imageFileFilter
          } )
      )
      async  addNewPaciente(@Res() res: Response , @Body() body: PacienteDTO,  @Param('email') email : string, @UploadedFiles() files   ){


          const x   = await this.registroPacienteService.isPacienteExist(body);
          console.log(files);
          
          if(x){
            return  res.status(200).json( NotSuccessMessageJson("Paciente ya existe") );
          }

          try {
            
            const existeCuenta : boolean =  await this.cuentaService.isCuentaExistsByEmail( email );

            if( !existeCuenta ){
              await  this.registroPacienteService.savePersona(body);
                
                const pacienteRegistrado = await this.registroPacienteService.savePaciente(body);
                
                return res.status(200).json( SuccessMessageJson("Paciente registrado", {
                  "paciente_registrado" : pacienteRegistrado  
                }) );
            }else{
              return res.status(200).json( NotSuccessMessageJson("Cuenta con el email ya existe , tome en cuenta que para administrador, medico y paciente deben ser distintos email") );
            }

          } catch (error) {
            throw new HttpException( ErrorException(error.message) , 500);
              
          }
          
        }
    

}
