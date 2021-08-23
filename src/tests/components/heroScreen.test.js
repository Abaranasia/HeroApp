import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroScreen } from '../../components/heroes/HeroScreen';

describe('Pruebas de heroScreen', () => {
/** Este componente requiere de props para funcionar, lo cual le llega desde heroList */
    const historyMock = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn(),
    }
    

    test('Debe mostrar el componente redirect si no hay argumentos en el URL', () => {

        const wrapper = mount ( // Debo usar mount porque es un HO Component
            <MemoryRouter initialEntries= {[ '/hero' ]}> 
                <HeroScreen history= { historyMock } />
            </MemoryRouter>
            ); //no recibe parámetros
            
        //expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('Redirect').exists()).toBe(true);
        //Por defecto, cargado sin parámetros, debería ir a redirect     
    });


    test('Debe mostrar la ficha de un heroe recibido por el URL', () => {
        
        const wrapper = mount ( // Debo usar mount porque es un HO Component
            <MemoryRouter initialEntries= {[ '/hero/marvel-spider' ]}> 
                <Route path="/hero/:heroId" component= {HeroScreen} />
            </MemoryRouter>
            ); //sí recibe parámetros

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.row').exists()).toBe(true) //prueba de que se dibuja ficha de héroe
    });  


    test('Debe probar el botón regresar (handleReturn) con push', () => {
        // forzamos el mock para que sea <=2 para que cumpla el if
        const historyMock = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn(),
        }

        const wrapper = mount ( 
            <MemoryRouter initialEntries= {[ '/hero/marvel-spider' ]}> 
                <Route 
                    path="/hero/:heroId" 
                    component= { () => <HeroScreen history= {historyMock}/> } 
                />
            </MemoryRouter>
            ); //sí recibe parámetros y necesitamos un history para el push
        
            wrapper.find('button').prop('onClick')();

            expect(historyMock.push).toHaveBeenCalledWith('/');
            expect(historyMock.goBack).not.toHaveBeenCalled();
    });


    test('Debe probar el botón regresar (handleReturn) con goBack', () => {
        // forzamos el mock para que sea >=2 para que cumpla el else

        // Aquí usaremos el historyMock declarado arriba con length: 10

        const wrapper = mount ( 
            <MemoryRouter initialEntries= {[ '/hero/marvel-spider' ]}> 
                <Route 
                    path="/hero/:heroId" 
                    component= { () => <HeroScreen history= {historyMock}/> } 
                />
            </MemoryRouter>
            ); //sí recibe parámetros y necesitamos un history para el push
        
            wrapper.find('button').prop('onClick')();

            expect(historyMock.goBack).toHaveBeenCalled();
            expect(historyMock.push).not.toHaveBeenCalled();
    });
});