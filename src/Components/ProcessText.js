import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import reactStringReplace from 'react-string-replace'

/////////////////////////////////////////////////////////Mention react-string-replace

//Use regex to identify and render mentions and hashtages
const ProcessText = ({content}) => {
    const users = useSelector(state => state.users)
    const usernames = users.map(u => u.username)

    usernames.forEach(u => {
       //Define regex for each username in store
       let userRegex = new RegExp(`@(${u})`, 'g')

       //Utilise react-string-replace to replace all instances of mentions with link to user profile
       content = reactStringReplace(content, userRegex, (match, i) => (
        <Link key={match + i} to={`/users/${match}`}>@{match}</Link>
      ));
    });

    //Utilise react-string-replace to replace all hashtags with bold text
    let hashRegex = new RegExp('#(\\w+)', 'g')
    content = reactStringReplace(content, hashRegex, (match, i) => (
      <Link key={match + i} to={`/search/${match}`}>
        <strong>#{match}</strong>
        </Link>
      ));
 
    return <p>{content}</p>
}


export default ProcessText