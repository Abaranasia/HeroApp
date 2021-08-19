import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../heroes/HeroCard'
import { getHerosByName } from '../../selectors/getHerosByName';
import { heroes } from '../../data/heroes';

export const SearchScreen = ( { history }) => {
/** Necesitamos un pequeño paquete para tratar los query strings y realizar las búsquedas de forma eficiente:
 * Query-string --> https://www.npmjs.com/package/query-string */
 

    const location= useLocation();
    //console.log(location.search) //nos permite obtener la información asociada a un parámetro de tipo search
    const {q= ''} = queryString.parse(location.search); // esta función nos permite parsear las búsquedas basadas en qs
    //console.log(q)

   
    
    const [ formValues, handleInputChange ] = useForm({  // Desestructuramos directamente la descripción en el formvalues
        searchText: q // tomamos la última búsqueda realizada
    })
    const {searchText} = formValues;


    const heroesFiltered= useMemo(() =>  getHerosByName(q), [q]); 
    // useMemo para evitar que se haga la búsqueda por cada letra introducida en el input
    //const heroesFiltered= getHerosByName(searchText); 
    //const heroesFilter= heroes; 
    
  
    const handleSearch = (e) => {
        e.preventDefault();
        //console.log(searchText)
        console.log("filtro: ",heroesFiltered);
        history.push(`?q=${searchText}`) //creamos el query string
        
    }
    
    return (
        <div>
            <h2>Search Screen</h2>
            <hr/>
            
            <div className="row">
                <div className="col-5">
                    <h4>Search form</h4>
                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="search hero"
                            className="form-control"
                            autoComplete="off"
                            name="searchText"
                            value={ searchText }
                            onChange={ handleInputChange }
                            />

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Search
                            </button>
                    </form>
                </div>
                <div className="col-7 row">
                    <h4>Results</h4>
                    <hr/>
                    {
                        heroesFiltered.map ( hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        )) 
                    }

                </div>
                
            </div>
        </div>
    )
}
