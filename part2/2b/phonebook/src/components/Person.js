import React from 'react'

const Person = ({person}, {i}) => {
    return (
        <div>
            <p key={i}>{person.name} - {person.number}</p>
        </div>
    )
}

export default Person