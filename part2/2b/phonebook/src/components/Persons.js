import React from 'react'
import Person from './Person'

const Persons = (props) => {
    return (
        <div>
        {props.pTS.map((person, i) => 
            <Person 
                person={person}
                key={i} />
        )}
      </div>
    )
}

export default Persons