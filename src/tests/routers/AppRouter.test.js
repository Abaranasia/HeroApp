import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../components/routers/AppRouter";


describe('Pruebas en AppRouter', () => {
 
    test('Debe mostrar loginScreen si no estoy autenticado ', () => {

        const contextValue = { // valores necesarios para enviar en el context provider
            dispatch: jest.fn(),
            user: {
                logged: false
            }
        }

        /** Este componente requiere de una provisión por parte de AuthContext, por lo que
         *  habrá que importar el componente e incluirlo en el shallow. Dado que es un
         *  High Order Component, shallow no nos servirá, por lo que debemos usar mount()
         */

        const wrapper = mount( 
            <AuthContext.Provider value = { contextValue }>
                <AppRouter/> 
            </AuthContext.Provider>
        );
        
        //console.log(wrapper.html())
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h2').exists()).toBe(true);
        expect(wrapper.find('h2').text()).toBe('Login')   
    });

    test('Debe mostrar el componente de Marvel si está autenticado', () => {

        const contextValue = { // valores necesarios para enviar en el context provider
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Ran'
            }
        }

        const wrapper = mount( 
            <AuthContext.Provider value = { contextValue }>
                <AppRouter/> 
            </AuthContext.Provider>
        );
        
       // console.log(wrapper.html())
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBe(true); // suficiente saber que se ha cargado el navbar
    });

});