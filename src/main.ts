import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import admin , { ServiceAccount } from 'firebase-admin'; 

async function bootstrap() {
 // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set the config options
  const adminConfig: ServiceAccount = {
      "projectId":"proyectos-david-ecff1", 
      "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHT+3EVV2kU0zL\nFxKvwDy9OIfQcXzGFpmC7nDd6SMMWxvo74WCWCeGyHLGkfXvDNrfIa3J/xWAXE4S\nuSx1d8MGHZDZBSVbGvKC5KWEF1BjBUPjBf7r8f3xaiDxRUWHup3hLVemkJDvuZxa\nJgSR9OksFeZ8630o0kM03apWdXRezG83pur37joe3Sl6PIH3O2L9Quxri4zqxLrO\n+PaGAAClPfygl2o+d1+b6qRnvui9prgbzwwMi/HpiYRyynUOkBJbwzYpl9giDAMn\nNh282B1rah/y/rs8jPvzTc/YL1qh6nw3dzYd5TrOhH9WIPmiEXytAaUg2jzVPtKt\nSmqzHqkVAgMBAAECggEAKrgeO25bmYi0JTRvECXpLtpiu8HTT0bRRN+z59BcL34I\nq6LI8CDSagBlH1vyBThxYhFfJTQsCNzf7AHt/kh6z8D/BpDkipQqRfVZZ4gyteKP\nRCXJF4vA1OFdKbFh/383byfPiVcjhYo4MZdD8/+1CXqxMfWsWBdHCdn39DuNA3M3\neAn3q9IJ1tvoPvO0DwxwsL7NQVkpY3R55z3JzkguhxvNrqdtOVsJVx5/EBDTUR9H\nItg4G3FNogcZLf+hPQTFVXtY8bNQ2BiibLyW+GgJEiYD7u6vTQiISOP43GC131lQ\nnk7GyLFedY/9wENHDmBQn7pcRl2E5iDX1M1Sfc6ZWQKBgQDr9e1E4Yon/X8CxWUZ\n8l76XHL3sRMBr0mGwLvgDs5KLhCy1pHTT/frLc9ohfDndxoVQPwaY5wr3zKWUBqg\nB9Fld9FwWR9nKkRM+1QbLFI/NgTadK/osheN+ZWtGey+AGuhQ3urIXEYlr6t6hPh\nbZOGtBYQCwOmigzs4kNGbV1+eQKBgQDYPThimaIlda0QGwifUoDhDf0MftTgNCAd\nEMg00oc9rM1UPeu7EP4mgu5m6hOGnThyPzIKyyjz5ITOuSLx83eiC+wBgkygvvbr\nDHMDJwFlgIMneAlRU8OvlhtNO44GuvYbDVzUgE/vsya+7HxZ+vVhExGScEc9PWYa\nfNOpBR0ofQKBgElNCZtXUTrhFf6/YYvw7i5qX9Cwco4YbQfuga62CsGik89qtrxl\nYEfv4DnBOjg9mJ23pVlxTkeWu7lUQyEprJQP58E1/npm9/bOMK+MUjSOzG0syKTK\nBmU1fpjar9/Kc6USOK3N4rtXwP539BsYljbHZP8w3L50rlU8aNfNC7lJAoGAaVOY\njV5r/ncNLxUb5A7Zu8WGhnmY0wRQyBeOjTwmp8Ht2aS3l8y1HqkT2okVrbIS9oMV\nqvA+KF4c2lyPSu7eTM4lzK5dCMc7mk3cD6MGKRypxaXQVA7K+FHTRpFFor2adp7R\noqhFR2op60FhaKq2ruwM2RlbedbYTvqSVnepNjkCgYBjnDiW0Ab0ovd/ihH2sl49\nfbUCyGuDZeBhoLfgdqlvJJ+oGUBvHWpxtgJAUTzt2tpRc94oC3Jev12h/ocTZXbH\nL9BFa1886fUmzl5ou0FOvPDrv+/HX+1Z7oMmC94NMZ47rEeiSaObre6bNtx0kPye\nu/GbaN1s6cObAAqgL4zKSg==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
      "clientEmail": "firebase-adminsdk-ytop5@proyectos-david-ecff1.iam.gserviceaccount.com",
    };

  // Initialize the firebase admin app
  admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
      databaseURL: "https://proyectos-david-ecff1-default-rtdb.firebaseio.com/",
    });  

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', '/public'));
  app.useGlobalPipes( new ValidationPipe({
        transform : true,
        whitelist : true
  }) );
  await app.listen( process.env.PORT || 3001);
}
bootstrap();
