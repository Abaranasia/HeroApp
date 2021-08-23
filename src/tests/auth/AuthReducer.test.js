import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";


describe('Pruebas en Authreducer', () => {
    
    test('Debe retornar el estado por defecto ', () => {

        const state= authReducer( {logged: false}, {})
        //Probamos valor inicial con logged: false y action vacío (por defecto)

        expect(state).toEqual({logged:false})
    });

    test('Debe autenticar y colocar el name del usuario', () => {
        
        const action = {
            type: types.login,
            payload: {
                name: 'Ran'
            }
        }
        const state= authReducer( {logged: false}, action)
        //Probamos valor incial con logged: false y el  action

        expect(state).toEqual({name:'Ran', logged:true})
    });

    test('Debe borrar el name y hacer logged=false', () => {
        const action = {
            type: types.logout,
            payload: {}
        }
        const state= authReducer( {logged: true, name:'casual'}, action)
        //Probamos valor incial con logged: true y el  action

        expect(state).toEqual({logged:false})
    });
});