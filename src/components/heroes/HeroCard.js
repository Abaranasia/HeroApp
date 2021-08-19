import React from 'react'
import { Link } from 'react-router-dom'

export const HeroCard = (
    {
        id,
        superhero,
        publisher, 
        alter_ego,
        first_appearance,
        characters
    }
) => {
    return (
        <div className="card ms-2" style= { { maxWidth: 250 } }>
            <div className="row no-gutters">
                <div className="">
                    <Link to= {`./hero/${ id }`}>
                        <img src={`./assets/heroes/${ id }.jpg`}  className="card-img-top" alt= { superhero } />
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{ superhero }</h5>
                        <p className="card-text"> {alter_ego} </p>
                        {
                            ( alter_ego !== characters ) && <p className="card-text">  { characters } </p>
                        }
                        {/* <small className="text-muted"> { first_appearance } </small> */}
                        <Link to= {`./hero/${ id }`}>
                            Más...
                        </Link>
                    </div>


                </div>
            </div>
            
        </div>
    )
}
