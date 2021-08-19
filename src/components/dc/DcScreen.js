import React from 'react'
import { HeroList } from '../heroes/HeroList'

export const DcScreen = () => {
    return (
        <div>
            <h2>Héroes de DC Cómics</h2>
            <HeroList publisher="DC Comics"/>
        </div>
    )
}
