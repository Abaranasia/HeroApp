import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types'

export const LoginScreen = ( { history }) => {

const { dispatch } = useContext(AuthContext)
    
    const handleLogin = () => {
        //history.push('/') // es bien, pero depende de que se haya visitado
        

        const lastpath = localStorage.getItem('lastpath') || '/'; // Busca un path de una visita anterior o lleva a '/'
        const action = { // defino la acción de añadir
            type: types.login,
            payload: { name:'Ran' }
        };
    
        dispatch (action) // enviamos la acción al reducer

        history.replace(lastpath) 
        /** replace borra el rastro y no será navegable de vuelta con el botón 
         * atrás del navegador, aunque aquí carga, si hay, un path anterior */
    }

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <hr/>
            <button
                className="btn btn-primary"
                onClick= {handleLogin}
            >
                Login
            </button>
        </div>
    )
}
