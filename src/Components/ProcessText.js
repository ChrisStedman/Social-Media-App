import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import reactStringReplace from 'react-string-replace'

/////////////////////////////////////////////////////////Mention react-string-replace

const ProcessText = ({content}) => {
    const users = useSelector(state => state.users)
    const usernames = users.map(u => u.username)

    usernames.forEach(u => {

       let userRegex = new RegExp(`@(${u})`, 'g')
       content = reactStringReplace(content, userRegex, (match, i) => (
        <Link key={match + i} to={`/users/${match}`}>@{match}</Link>
      ));
    });

    let hashRegex = new RegExp('#(\\w+)', 'g')
    content = reactStringReplace(content, hashRegex, (match, i) => (
        <strong key={match+i}>#{match}</strong>
      ));
 
        
    return <p>{content}</p>

}

export default ProcessText