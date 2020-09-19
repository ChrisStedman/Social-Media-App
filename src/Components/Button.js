import React from 'react'

const Button = ({eventHandler, action, style}) => {
    
        return <button className={`button ${style}`} onClick={eventHandler}>{action}</button>
}

export default Button