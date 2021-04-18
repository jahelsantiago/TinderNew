import { SwipeableDrawer } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useState, useMemo } from 'react'
import TinderCard from 'react-tinder-card'
import IconButton from '@material-ui/core/IconButton';
import "./TinderCards.css"

const db = [
    {
        name: "Jahel",
        url: "https://www.indiewire.com/wp-content/uploads/2021/03/brad-pitt.png?w=780"
    },
    {
        name:"Juanca",
        url:"https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F558c0172e4b0425fd034f8ba%2F0x0.jpg%3Ffit%3Dscale%26background%3D000000"
    }
]

const alreadyRemoved = []
let charactersState = db 

const TinderCards = () => {
    const [people, setpeople] = useState(db)
    const [lastDirection, setlastDirection] = useState()
    
    const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, nameToDelete) => {
        console.log("removing"+nameToDelete)
        setlastDirection(direction)
        alreadyRemoved.push(nameToDelete)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
        charactersState = charactersState.filter(character => character.name !== name)
        setpeople(charactersState)
    }

    const swipe = (dir) => {
        const cardsLeft = people.filter(person => !alreadyRemoved.includes(person.name))
        if (cardsLeft.length) {
          const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
          const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
          alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
          childRefs[index].current.swipe(dir) // Swipe the card!
        }
      }

    return (
        <div className = "TinderCards">
            {
                people.map((person=>(
                    <TinderCard
                        className = "swipe"
                        key = {person.name}
                        preventSwipe = {["up","down"]}
                        onSwipe = {(dir) => swiped(dir, person.name)}
                        onCardLeftScreen = {() => outOfFrame(person.name)}
                    >
                        <div style = {{backgroundImage: `url(${person.url})`}}className="card">
                            <div className="card_description">
                                <h3>{person.name}</h3>
                            </div>                                                        
                        </div>

                    </TinderCard>
                )))
            }
            
            <div className="TinderCards_Buttons">
            
                <IconButton>
                    <FavoriteIcon/>
                </IconButton>
                
                <IconButton>
                    <FavoriteIcon/>
                </IconButton>
                <button onClick={() => swipe('left')}>Swipe left!</button>            
                <button onClick={() => swipe('right')}>Swipe right!</button>
            </div>

            
        </div>
    )
}

export default TinderCards
