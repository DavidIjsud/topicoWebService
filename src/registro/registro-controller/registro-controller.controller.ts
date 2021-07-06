import { Get, Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Administrador } from '../../entities/administrador.entity';
import { ServiceRegistroService } from '../service-registro/service-registro.service';

@Controller('registro')
export class RegistroControllerController {


    constructor( private registroService : ServiceRegistroService  ){}


    @Get('allAdministradores')
  async  getAllAdministrators( @Res() res ){

             let adms : Administrador[] = [];
          try {
            adms  = await this.registroService.getAllAdministradores();  
          } catch (error) {
              
          } 

            return res.status(200).json({
                   "status" : "ok",
                   "message" : "Datos obtenidos correctamente",
                   "data" :  adms  
            });

    }


}
