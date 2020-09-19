import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import reactStringReplace from 'react-string-replace'


const ProcessText = ({content}) => {
    const users = useSelector(state => state.users)
    const usernames = users.map(u => u.username)

    usernames.forEach(u => {

       let userRegex = new RegExp(`@(${u})`, 'g')
       content = reactStringReplace(content, userRegex, (match) => (
        <Link to={`/users/${match}`}>@{match}</Link>
      ));
    });

    let hashRegex = new RegExp('#(\\w+)', 'g')
    content = reactStringReplace(content, hashRegex, (match) => (
        <strong>#{match}</strong>
      ));
      console.log(hashRegex)
        
    return <p>{content}</p>

}

const processHash = (content) => {
    
}



export default ProcessText