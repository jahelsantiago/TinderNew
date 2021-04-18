import React, { useState } from 'react'
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';
import "./Header.css"

const Header = () => {

    const [personSelceted, setpersonSelceted] = useState(true);
    const [messageSelected, setmessageSelected] = useState(false);

    const selectPerson = () =>{
        setpersonSelceted(true)
        setmessageSelected(false)
    }

    const selectMessage = () =>{
        setpersonSelceted(false)
        setmessageSelected(true)
    }

    return (
        <div className = "Header">
            <IconButton onClick = {selectPerson}>
                <PersonIcon fontSize = "large" className = {personSelceted && "selected"}/>   
            </IconButton>
            <IconButton onClick = {selectMessage}>
                <ForumIcon fontSize = "large" className = {messageSelected && "selected"  }/>   
            </IconButton>
        </div>
    )
}

export default Header
