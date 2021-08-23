import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = ({ history }) => {

    const { heroId } = useParams(); // obtiene los parámetros enviados
    
const hero = getHeroById( heroId );

//console.log('HERO: ',hero);

if (!hero) {
    return <Redirect to="/" />
}

const {    
        superhero,
        publisher, 
        alter_ego,
        first_appearance,
        characters
     } = hero;

     //console.log(hero.superhero);


     const handleReturn = () => {
         if (history.length<=2) {
            history.push('/') //por si navegamos en incógnito o directamente con la url pegada
         }else {
            history.goBack();
         }   
     }

    return (
        <div className="row mt-5 animate__animated animate__fadeInLeft">
            <div className="col-4">
                <img    src={`../assets/heroes/${ heroId }.jpg`}
                alt="superhero"
                className="img-thumbnail"
                />
            </div>

            <div className="col-8">
                <h3>{ superhero }</h3>
                <ul className="list-gropu list-group-flush">
                    <li className="list-group-item"> <b>Alter ego: </b>{ alter_ego }</li>
                    <li className="list-group-item"> <b>Publisher: </b> { publisher }</li>
                    <li className="list-group-item"><b>First appearance: </b>{ first_appearance }</li>
                </ul>
                <h5>Characters</h5>
                <p>{ characters }</p>
                <button 
                    className="btn btn-outline-info"
                    onClick= {handleReturn} >
                    Return
                </button>
            </div>
        </div>
    )
}
