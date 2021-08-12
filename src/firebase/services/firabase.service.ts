import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirabaseService {



    async enviarNotificacion( data   ){
     
      const token  = "dE3YZI9QSbur_sFgDueuJH:APA91bHyDB9_HWZO_3MVtZrKAHS619skmkYDvvEmKKZORcJSvxRNoMmR05WvknFiB1cuMz3bRK8rcxFnoRpLRtPDSfr_aj_2MhQStXtKsxgiJDVWuWqMvNXOe1zkKB2FyryV39ZDjdrw" ;
      await admin.messaging().sendToDevice( token , {
            data : data
      } );   

    }

}
