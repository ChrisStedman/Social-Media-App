import React from 'react'

const Button = ({eventHandler, action}) => {
    
        return <button onClick={eventHandler}>{action}</button>
}

export default Button