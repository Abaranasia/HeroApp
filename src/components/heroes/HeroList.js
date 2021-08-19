import React, { useMemo } from 'react'
import { getHeroByPublisher } from '../../selectors/getHeroByPublisher';
import { HeroCard } from './HeroCard';

export const HeroList = ( {publisher} ) => {

    //const heroes = getHeroByPublisher ( publisher ); 
    /** Esta llamada es ok, pero sería más óptimo usarlo con useMemo para evitar llamar
     *  a esta función cada vez que accedemos aquí al regresar de una ficha de heroe */
    
     const heroes = useMemo(() => getHeroByPublisher ( publisher ), [ publisher ]);
    // Así solo ejecutaremos la función de nuevo cuando cambiemos de publisher

    return (
        <div className="row row-cols-1 row-cols-md-2 g-4 animate__animated animate__fadeIn">
            {
                heroes.map( hero => (
                    <HeroCard 
                        key={hero.id}
                        {...hero}
                    />    
                ))
            }
        </div>
    )
}
