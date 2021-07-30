import { Body, Controller, Get, HttpException, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Multer } from 'multer';
import MulterGoogleCloudStorage from 'multer-cloud-storage';
import { MedicoValidate } from 'src/dtos/dtos_helpers/medicoValidate';
import { MedicoDTO } from 'src/dtos/Medico.dto';
import { Medico } from 'src/entities/Medico';
import { editFileName, ErrorException, imageFileFilterContrato, NotSuccessMessageJson, SuccessMessageJson } from 'src/shared/helper.shared';
import { ServiceCuentaService } from '../registro-cuenta/services/service-cuenta.service';
import { MedicoServiceService } from './services/medico-service.service';

@Controller('registro/medico')
export class MedicoControllerController {

        constructor( private registroMedicoService : MedicoServiceService,
                    private registroCuentaService : ServiceCuentaService
            ){}

        @Get('getall')
        async getAll( @Res() res : Response ){

                let lista : Medico[] = [];

                try{
                        lista = await this.registroMedicoService.getAllMedico();
                }
                catch(error){
                    throw new HttpException( ErrorException(error.message) , 500);
                }

                return res.status(200).json( 
                    SuccessMessageJson( "Data Found" , lista )
               ); 

        }


        @Post('validatemedico')
        async validateMedico( @Res()res : Response , @Body() body : MedicoValidate  ){

                const aceptado : boolean = await this.registroCuentaService.aceptMedico(body);
                if( aceptado ){
                    return res.status(200).json( SuccessMessageJson("Medico aceptado", []) );
                }else{
                    return res.status(200).json( NotSuccessMessageJson("Medico no aceptado") );
                }

        }

        //create a method post that add new Medico
        @Post('add/:email')
        @UseInterceptors(
            FileFieldsInterceptor(
              [ { name : 'image', maxCount : 1 } , { name : 'contrato' , maxCount: 1 }, { name : 'cv' , maxCount: 1 } , { name:'fotoTituloProfesional', maxCount:1 } ], {
                storage : new MulterGoogleCloudStorage({
                    projectId : 'loyalty-pedidos',
                    bucket : 'topico_avanzado',
                    keyFilename : './loyalty-pedidos-86c71fb01b85.json',
                    keyFile : './loyalty-pedidos-86c71fb01b85.json',
                    filename : editFileName,
                }),
                fileFilter : imageFileFilterContrato
            }
            )
        )
        async add( @Res() res : Response , @Body() body : MedicoDTO, @Param('email') email : string, @UploadedFiles() files : Multer  ){
            const x = await this.registroMedicoService.isMedicoExists(body);
            if(x){
                return  res.status(200).json( NotSuccessMessageJson("Medico ya existe") ); 
            
            }

            try{
                const existeCuenta : boolean =  await this.registroCuentaService.isCuentaExistsByEmail( email );
                if( !existeCuenta ){

                    console.log(files);
                        

                    body.foto = files["image"][0].linkUrl;
                    body.fotoTituloProfesional = files["fotoTituloProfesional"][0].linkUrl;
                    body.contrato = files["contrato"][0].linkUrl;
                    body.cv = files["cv"][0].linkUrl;
                    await this.registroMedicoService.savePersona(body);
                    const medicoRegistrado = await this.registroMedicoService.saveMedico(body);
                    return res.status(200).json( SuccessMessageJson("Medico registrado",medicoRegistrado) );
                }else{
                    return res.status(200).json( NotSuccessMessageJson("Cuenta con el email ya existe , tome en cuenta que para administrador, medico y paciente deben ser distintos email") );
                }

            }catch(err){
                throw new HttpException( ErrorException(err.message) , 500);
            }
        
        }
}
