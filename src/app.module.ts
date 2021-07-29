import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroModule } from './registro/registro.module';
import { MailModuleModule } from './mail-module/mail-module.module';


@Module({
  imports: [
            TypeOrmModule.forRoot(),
            RegistroModule,
            MailModuleModule
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
