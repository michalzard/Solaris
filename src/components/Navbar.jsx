import React from 'react'
import "../styles/Navbar.scss";
import {Button} from "@material-ui/core";


function Navbar() {
    return (
        <div className="navbar">
        <Button variant="text" href="/console">Console</Button>
        <Button variant="text" href="/stats">Statistics</Button>
        <Button variant="text" href="/info">Information</Button>
        <Button variant="text" href="/config">Configuration</Button>
        </div>
    )
}

export default Navbar;
