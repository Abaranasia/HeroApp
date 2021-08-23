import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { SearchScreen } from '../../components/search/SearchScreen';

describe('Pruebas en searchScreen', () => {
    /** Probaremos: snapshot inicial, el handleSearch con history, 
     * llamada con un query-string que muestre resultados y otro sin resultados
     * Necesitaremos memoryRouter por el location y Route porque tenemos que trabajar con la ruta*/


    test('Debe mostrarse con valores por defecto', () => {
    //Primero probamos snapshop sin query-string y form vacío
        
        const wrapper= mount( 
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component= {SearchScreen} />
            </MemoryRouter>            
        )
    // Debemos especificar el mismo path en initialEntries o el snap se renderizará vacío por no estar en el sitio

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    });


    test('Debe mostrarse con resultado e input con Batman', () => {
        //Primero probamos snapshop sin query-string y form vacío
            
            const wrapper= mount(           
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <Route path="/search" component= {SearchScreen} />
                </MemoryRouter>            
            )
        // Debemos especificar el mismo path en initialEntries o el snap se renderizará vacío por no estar en el sitio
    
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('input').prop('value').toLowerCase()).toBe('batman');
            expect(wrapper.find('img').prop('alt').toLowerCase()).toBe('batman');
        });


    test('Debe mostrarse sin resultados pero input con Joker', () => {
        //Primero probamos snapshop sin query-string y form vacío
            
            const wrapper= mount(
                    <MemoryRouter initialEntries={['/search?q=joker']}>
                        <Route path="/search" component= {SearchScreen} />
                    </MemoryRouter>
            )
        // Debemos especificar el mismo path en initialEntries o el snap se renderizará vacío por no estar en el sitio
    
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('input').prop('value').toLowerCase()).toBe('joker');
            expect(wrapper.find('.alert-danger').text().trim()).toBe('There is no a hero with joker');
        });


    test('Debe llamar al push del history', () => {

        const historyMock = {
            push: jest.fn(),
        }
    
        const wrapper= mount(
                <MemoryRouter initialEntries={['/search?q=joker']}>
                    <Route 
                        path="/search" 
                        component= { () => <SearchScreen history= {historyMock} /> } 
                    />
                </MemoryRouter>
        ) // necesitamos mandarle el history

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        }); //accedemos al input y cambiamos su valor por batman

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })
        expect(wrapper).toMatchSnapshot();
        expect(historyMock.push).toHaveBeenCalledWith('?q=batman')
    });
});