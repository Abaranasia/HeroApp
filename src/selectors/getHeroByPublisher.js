import { heroes } from '../data/heroes.js';

export const getHeroByPublisher = ( publisher ) => {

    const validPublishers = ['DC Comics', 'Marvel Comics'];

    if ( !validPublishers.includes( publisher ) ) {
        throw new Error (`Publisher ${publisher} no es correcto `)
    }

    return heroes.filter( hero => hero.publisher === publisher ) // Devuelve varios resultados (array de obj)
}