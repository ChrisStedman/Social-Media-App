import React, { useState } from 'react'
import Button from './Button'
import ChangeAvatar from './ChangeAvatar'

//Display logged in user options
const MyProfileOptions = ({ deleteUser, setAvatar, user }) => {
    const [isActive, setIsActive] = useState(false)

    //Control toggle of pop-up window containing avatar options
    const toggleActive = () => {
        setIsActive(!isActive)
    }

    return (
        <div>
            {isActive ? <ChangeAvatar isActive={toggleActive} 
                            username={user.details.username} 
                            setAvatar={setAvatar} /> : 
                        <> </>}
                        
            <div className="field">
                <Button eventHandler={toggleActive}
                    action="Change Avatar" addStyle="is-dark" />
            </div>

            <Button eventHandler={deleteUser}
                action="Delete Account" addStyle={'is-danger'}>
            </Button>
        </div>
    )
}

export default MyProfileOptions