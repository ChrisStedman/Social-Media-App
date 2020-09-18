import React from 'react'

const Button = ({eventHandler, action}) => {
    
        return <button className="button" onClick={eventHandler}>{action}</button>
}

export default Button