import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailServiceService {

    constructor(private mailerService: MailerService  ){}


    async sendActivatedMedico(mensaje : string ,  correo : string  ){
      
        await this.mailerService.sendMail({
             to : correo,
             subject : "Medico aceptado en la plataforma",
             template : './medico_validado',
             context : {
               mensaje : mensaje
             }
        });

    }


    async sendUserConfirmation( email : string , pin : number , name : string ) {
        
        await this.mailerService.sendMail({
          to: email ,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Bienvenido a la plataforma de consulta medica en linea',
          template: './confirmation', // `.hbs` extension is appended automatically
          context: { // ✏️ filling curly brackets with content
            name: name,
            pin : pin
          },
        });
      }

}
