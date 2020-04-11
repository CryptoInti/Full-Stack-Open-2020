import React from 'react'
import Person from './Person'

const Persons = (props) => {
    return (
        <div>
        {props.pTS.map((person, i) => {
            return (
                <Person 
                    person={person}
                    key={i}
                    delPerson={props.delPerson} />
            )

        }
        )}
      </div>
    )
}

export default Persons