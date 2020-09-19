import React from 'react'

const Button = ({eventHandler, action, addStyle}) => {
    
        return <button className={`button ${addStyle}`} onClick={eventHandler}>{action}</button>
}

export default Button