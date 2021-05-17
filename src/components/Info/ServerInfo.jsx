import React from 'react'
import {TextField} from "@material-ui/core";
import "./ServerInfo.scss";
function ServerInfo({data}) {
    return (
        <div className="server-info">
        <div className="info">
        <span>Server Information<span>(Read-only)</span></span>
        <div className="values">
        <TextField label="Hostname" disabled value="Default"
        inputProps={{style:{color:"white"}}} InputLabelProps={{style:{color:"gray"}}}/>
        <TextField label="URL" disabled value="Default" 
        inputProps={{style:{color:"white"}}} InputLabelProps={{style:{color:"gray"}}}/>
        <TextField label="Description" disabled value="Default"
        inputProps={{style:{color:"white"}}} InputLabelProps={{style:{color:"gray"}}}/>
        </div>
        </div>
        </div>
    )
}

export default ServerInfo

/**
 * 
[Server Info]
Server hostname
Server URL
Server Description
Server Image

 */