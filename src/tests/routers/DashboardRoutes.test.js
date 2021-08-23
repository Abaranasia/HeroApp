import React from 'react'
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../components/routers/DashboardRoutes";

describe('Pruebas en DashboardRoutes', () => {
    
    test('Debe mostrarse correctamente', () => {
        
        const contextValue = { // valores necesarios para enviar en el context provider
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Ran'
            }
        }

        const wrapper = mount( 
            
            <AuthContext.Provider value = { contextValue }> 
                <MemoryRouter>
                    <DashboardRoutes/> 
                </MemoryRouter>
            </AuthContext.Provider>
            
        ); //Debemos proporcionar contexto y MemoryRouter

        //console.log(wrapper.html());

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Ran')
        
    });
});