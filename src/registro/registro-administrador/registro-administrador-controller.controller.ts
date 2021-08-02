import { Body, Controller, Get, HttpException, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Administrador } from 'src/entities/Administrador';
import { RegistroAdministradorServiceService } from './services/registro-administrador-service.service';
import { Response } from 'express';
import { AdministradorDTO } from '../../dtos/Administrador';
import { editFileName, ErrorException, imageFileFilter, imageFileFilterContrato, NotSuccessMessageJson, SuccessMessageJson } from '../../shared/helper.shared';
import { ServiceCuentaService } from '../registro-cuenta/services/service-cuenta.service';
import { PersonaDTO } from 'src/dtos/persona.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import MulterGoogleCloudStorage from 'multer-cloud-storage';
import { Multer } from 'multer';
import { LoginAdministradorMedicoDTO } from 'src/dtos/dtos_helpers/login.administrador.medico';
import { Cuenta } from 'src/entities/Cuenta';
import { Rol } from 'src/enums/roles';
@Controller('registro/administrador')
export class RegistroAdministradorControllerController {

    constructor( private registroAdministradorService : RegistroAdministradorServiceService ,
                 private cuentaService : ServiceCuentaService  
      ){}

    @Get('getall')
        async getAll( @Res() res : Response    ) {
            let lista:Administrador[]  = [];
               try {
                 lista = await this.registroAdministradorService.getAllAdministradores();
               } catch (error) {
                throw new HttpException( ErrorException(error.message) , 500);
                   
               }

              return res.status(200).json( 
                    SuccessMessageJson( "Data Found" , lista )
               ); 

        }

     @Post('iniciosesion')
        async iniciosesion( @Res() res : Response  , @Body() body : LoginAdministradorMedicoDTO   ) {

              const cuenta: Cuenta = await this.cuentaService.cuentaExiste(body);
              if( cuenta == null || cuenta == undefined ){
                  
                  return res.status(200).json( NotSuccessMessageJson("Cuenta no existe") );
              }

              if( cuenta.tipoCuenta == Rol.ADMINISTRADOR || cuenta.tipoCuenta == Rol.SALUD ){
                return res.status(200).json( SuccessMessageJson("Cuenta existe", cuenta ) );
              }

              return res.status(200).json( NotSuccessMessageJson("Usted no es medico y/o administrador" ) );

              
              

        }   

      //create a method post that add new administrador
    @Post('add/:email')
    @UseInterceptors(
        FileFieldsInterceptor(
          [ { name : 'image', maxCount : 1 } , { name : 'contrato' , maxCount: 1 }  ], {
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
    async addNewAdministrador( @Res() res: Response , @Body() body : AdministradorDTO , @Param('email') email : string, @UploadedFiles() files  : Multer  )   {

      const x = await this.registroAdministradorService.isadministradorExists(body);
      if( x ){
        return  res.status(200).json( NotSuccessMessageJson("Administrador ya existe") );
      }

      try {

         const existeCuenta : boolean =  await this.cuentaService.isCuentaExistsByEmail( email );
        if( !existeCuenta ){
          
          body.contrato = files["contrato"][0].linkUrl;
          body.foto = files["image"][0].linkUrl;  
          await this.registroAdministradorService.savePersona(body);
          const administradorRegistrado = await this.registroAdministradorService.saveAdministrador(body);
          return res.status(200).json( SuccessMessageJson("Administrador registrado", {
                      "administrador_registrado" : administradorRegistrado 
            } ) );
            
        }else{
           return res.status(200).json( NotSuccessMessageJson("Cuenta con el email ya existe , tome en cuenta que para administrador, medico y paciente deben ser distintos email") );
        }
      } catch (error) {
         throw new HttpException( ErrorException(error.message) , 500);
      }

    }


}

