import React, {useEffect, useReducer} from 'react'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'
import { AppRouter } from './components/routers/AppRouter'


const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged:false }
    // El estado inicial del reducer será el que encontremos en localStorage o logged out
}

export const HeroesApp = () => {
    
    const [ user, dispatch ] = useReducer(authReducer, {}, init) 
    /** instancia a authReducer con user, cuyas acciones son estar o no logueado
     *  Esto estará disponible desde el nivel más alto de la app gracias al context */
    
    useEffect(() => { //guardamos el usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])


    return (
        <AuthContext.Provider value = {{ user, dispatch }}>
            <AppRouter/>
        </AuthContext.Provider>
    )
}
