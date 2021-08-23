import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';

import { LoginScreen } from '../../components/login/LoginScreen';
import { types } from '../../types/types';


describe('Debe mostrarse correctamente', () => {
    /** Mostrarse, handleLogin con replace y localStorage; ojo con history */

    const historyMock = {
        replace: jest.fn(),
    }

    const contextValue = { // valores necesarios para enviar en el context provider
        dispatch: jest.fn(),
    }

    const wrapper = mount(
        <AuthContext.Provider value= {contextValue}>
                <LoginScreen history= { historyMock } />
        </AuthContext.Provider>
    );

    test('Debe mostrarse correctamente', () => {

        expect (wrapper).toMatchSnapshot();
        expect(wrapper.find('h2').text().trim()).toBe('Login')
    });
    
    test('Debe realizar el dispatch y la navegación en handleLogin', () => {
        
        const action = { // defino la acción de añadir
            type: types.login,
            payload: { name:'Ran' }
        };

        //const handleClick = wrapper.find('button').prop('onClick');
        const handleClick = () => {wrapper.find('button').simulate('click')}
        
        /** hacemos esta asignación para poder invocar el click varias veces:
         * una sin localStorage previo y otra con una ruta guardada
         * wrapper.find('button').simulate('click') no se puede usar como funcion pues devuelve un objeto
         */
       // console.log(handleClick.html());
        handleClick();
        
        expect(contextValue.dispatch).toHaveBeenCalledWith(action);
        expect(historyMock.replace).toHaveBeenCalledWith('/')
        //LLamada sin localStorage previo

        const lastpath= '/marvel';
        localStorage.setItem('lastpath', lastpath);
        //guardamos en localStorage
        
        handleClick();
        
        expect(historyMock.replace).toHaveBeenCalledWith('/marvel')
        //Probamos si leyó del localStorage

        
    });


});