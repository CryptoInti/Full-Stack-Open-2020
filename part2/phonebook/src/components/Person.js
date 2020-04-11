import React from 'react'

const Person = (props) => {
    return (
        <div>
            <p key={props.i}>{props.person.name} - {props.person.number} 
                <button onClick={props.delPerson} value={props.person.id}>delete</button>
            </p>
        </div>
    )
}

export default Person