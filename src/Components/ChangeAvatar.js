import React, { useState } from 'react'

const ChangeAvatar = ({ isActive, username, setAvatar }) => {
    const [selectedOption, setSelectedOption] = useState(null)

    //Generate random set of avatar links
    const getOptions = () => {
        let options = []
        for (let i = 0; i < 6; i++) {
            const ranNum = Math.floor(Math.random() * 10000)
            options.push("http://robohash.org/" + username + ranNum)
        }
        return options
    }

    //Toggle avatar window
    const toggleSelectedOption = (option) => {
        if (selectedOption === option) {
            setSelectedOption(null)
        } else {
            setSelectedOption(option)
        }
    }

    //Initiate saving of avatar
    const saveAvatar = () => {
        setAvatar(selectedOption)
        setSelectedOption(null)
        isActive()
    }
    const [avatarOptions, setAvatarOptions] = useState(getOptions())

    return (
        <div className={`modal ${isActive ? "is-active" : ""}`}>
            <div className="modal-background" onClick={isActive}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Select a new Avatar</p>
                    <button className="delete" aria-label="close" onClick={isActive}></button>
                </header>
                <section className="modal-card-body">
                    <div className="columns is-multiline is-centered">

                        {
                            //Map over all avatar options and render
                            avatarOptions.map(option =>
                                <div key={option} className={`column is-narrow box mx-2 my-2
                                        ${selectedOption === option ? "highlight-avatar" : ""}`}>

                                    <figure className="image is-128x128 " onClick={() => toggleSelectedOption(option)}>
                                        <img src={option} alt="Avatar option" />
                                    </figure>

                                </div>
                            )
                        }
                    </div>
                </section>

                <footer className="modal-card-foot">
                    {
                        //If option selected allow click - else disable button
                        selectedOption ?
                        <button className="button is-dark" onClick={saveAvatar}>Save</button> :
                        <button className="button is-dark"
                            title="Disabled button" disabled>Save</button>
                    }

                    <button className="button is-link" onClick={() => setAvatarOptions(getOptions())}>See more options</button>
                    <button className="button is-danger" onClick={isActive}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export default ChangeAvatar