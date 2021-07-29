import { extname } from "path";
import { Persona } from "src/entities/Persona";
import { Repository } from "typeorm";
import { PersonaDTO } from "../dtos/persona.dto";


export const savePerson =  async ( p : PersonaDTO , personaRepositorio : Repository<Persona> ) : Promise<Persona> =>   {

    const personaJson = JSON.parse(JSON.stringify(p));            
    const persona = await personaRepositorio.save(personaJson);           
    return persona;

}

export const ErrorException = (error : string)  => {
        return {
             "status" : false,
             "message" : "Hubo un error interno",
             "data" : error
        }
}

export const SuccessMessageJson = (message : string , data : any)  => {
        return {
             "status" : true,
             "message" : message,
             "data" : data
        }
}

export const NotSuccessMessageJson = ( message : string  ) => {
        return {
             "status" : false,
             "message" : message,
             "data" : null
        }
}

export const imageFileFilter = (  req, file , callback  ) => {
        if( !file.originalname.match(/\.(jpg|jpeg|png)$/)  ){
                 return callback( new Error("El archivo no es una imagen") );       
        }

        return callback( null , true );
}
export const editFileName = (req, file, callback) => {
        const name = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        const randomName = Array(4)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        callback(null, `${name}-${randomName}${fileExtName}`);
      };