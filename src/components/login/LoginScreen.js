import React from 'react'

export const LoginScreen = ( { history }) => {


    const handleLogin = () => {
        //history.push('/') // es bien, pero depende de que se haya visitado
        history.replace('/') // esto borra el rastro y no será navegable de vuelta con el botón atrás
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
