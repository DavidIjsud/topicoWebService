import { Module } from '@nestjs/common';
import { FirabaseService } from './services/firabase.service';

@Module({

  providers: [FirabaseService],
  exports : [ FirabaseService ]
})
export class FirebaseModule {
    
}
