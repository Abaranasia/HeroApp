import { types } from "../types/types";

/** Reducer para tener bajo los estados de autenticación en la app
 * Toma los estados (login y logout) desde types
 * Este reducer estará compartido en toda la aplicación gracias a un context (AuthContext)
*/

export const authReducer = (state= {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            }
        case types.logout:
            return {
                logged: false
            }
        default:
            return state;
    }
}