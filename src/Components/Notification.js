import React from 'react'

const Notification = ({id, message}) => {
        const successStyle = {
            color: "green"
        }

    const failStyle = {
        color: "red"
    }

    if(id <0)
        return <p style={successStyle}>{message}</p>

    if(id === 1){
        return <p style={failStyle}>{message}</p>
    }
    
    
        
    


}

export default Notification