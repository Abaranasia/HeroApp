import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../components/routers/PrivateRoute";
/** Para hacer tests sobre un elemento dentro de un Router debemos emplear
 * el componente <MemoryRouter>  */

describe('Pruebas en PrivateRoute', () => {
    

    const props = {
        location: {
            pathname: '/marvel' // necesario para que funcione el localStorage
        }
    }

    Storage.prototype.setItem= jest.fn(); // Para probar localStorage

    test('Debe mostrar el componente si está autenticado y guardar localStorage', () => {
    
        /** Usamos mount en lugar de shallow porque este solo puede renderizar un High 
         *  Order Component, por lo que expect dará un error aunque el console muestre contenidos */

        const wrapper= mount(
            <MemoryRouter> 
                <PrivateRoute
                    isAuthenticated= {true}
                    component= {() => <span>Listo!</span>} //espera una función
                    { ...props }
                />
            </MemoryRouter>
        )
        //console.log( wrapper.html() )

        expect( wrapper.find('span').exists() ).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastpath', '/marvel')
    });


    test('No debe mostrar nada si no está autenticado ', () => {

        const wrapper= mount(
            <MemoryRouter> 
                <PrivateRoute
                    isAuthenticated= {false}
                    component= {() => <span>Listo!</span>} //espera una función
                    { ...props }
                />
            </MemoryRouter>
        )
        // console.log("xxx", wrapper.html(), "xxx" )
        /** Al no estar autenticado se llama a Redirect, lo cual se muestra como {} */
        expect( wrapper.find('span').exists() ).toBe(false);
        expect( wrapper).toEqual( {} )
    });
});