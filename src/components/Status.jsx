import React from 'react'
import "../styles/Status.scss";
import OnlineIcon from '@material-ui/icons/FiberManualRecord';
import {Tooltip} from "@material-ui/core";

function Status() {
    const wsConnected=true;
    return (
        <span className="status">
        <span className="info">
        <span>Server status</span>
        <Tooltip title={wsConnected ? "Online" : "Offline"} placement="right">
        <OnlineIcon style={{color: wsConnected ? "lightgreen" : "red"}}/>
        </Tooltip>
        </span> 
        </span>
    )
}

export default Status;
