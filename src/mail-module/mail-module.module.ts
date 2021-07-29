import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailServiceService } from './services/mail-service.service';

@Module({
    imports : [
         MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                user: 'davidijsud@gmail.com',
                pass: 'Software1992..',
              },
            },
            defaults: {
              from: '"No Reply" <noreply@noreply.com>'//'"nest-modules" <modules@nestjs.com>',
            },
            template: {
              dir: join(__dirname, 'templates'),
              adapter: new HandlebarsAdapter(),
              options: {
                strict: true,
              },
            },
          })
    ],
    providers: [MailServiceService],
    exports : [ MailServiceService ]
})
export class MailModuleModule {}
