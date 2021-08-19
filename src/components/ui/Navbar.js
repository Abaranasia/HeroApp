import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';



export const Navbar = () => {

    const { user, dispatch } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        
        //<Redirect to="/login" />
        const action = { // defino la acción de añadir
            type: types.logout,
            payload: {}
        };
    
        dispatch (action) // enviamos la acción al reducer
        
        history.replace('/login');
        /** history.replace('/login') no funcionará porque Navbar no tiene acceso al history de la ruta
         * Sin embargo el Router también tiene un provider, como el context, permitiendo conservar 
         * información (de navegación) para sus descendientes: useHistory
         */
    }

  
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ms-auto">
                    <span className="nav-item nav-link text-info">
                        {user.name}
                    </span>
                    <button className="nav-item nav-link btn" onClick={ handleLogout }> 
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}
