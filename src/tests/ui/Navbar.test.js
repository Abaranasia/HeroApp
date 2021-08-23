import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { Navbar } from '../../components/ui/Navbar';
import { types } from '../../types/types';

describe('Pruebas de Navbar', () => {
    
    const historyMock = { // Mock para probar useHistory
        push: jest.fn(), // Necesario porque se usa
        location: {},
        replace: jest.fn(), // Necesario porque se usa
        listen: jest.fn(), // Necesario para el mock: sin esto da error 
        createHref: jest.fn() // Necesario para el mock: sin esto da error 
    }

    const contextValue = { // valores necesarios para enviar en el context provider
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Ran'
        }
    }
    
    const wrapper= mount(
        <AuthContext.Provider value = { contextValue }>
            <MemoryRouter>
                <Router history= { historyMock } >
                    <Navbar/> 
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    afterEach ( () => {
        jest.clearAllMocks() //limpia todos los mocks al terminar
    })

    test('Debe mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Ran');       
    });

    
    test('Debe llamar a logout y usar history', () => {
         wrapper.find('button').simulate('click')
         //prop('OnClick')(); // Forma alternativa de simular un click

         expect( contextValue.dispatch ).toHaveBeenCalledWith({
             type: types.logout,
             payload:{}
         });
         
         expect (historyMock.replace).toHaveBeenCalledWith('/login');
    });
});