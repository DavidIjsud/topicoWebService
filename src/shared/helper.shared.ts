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

