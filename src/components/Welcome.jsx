import React, { useState} from 'react'
import "../styles/Welcome.scss";
import {TextField,Button} from "@material-ui/core";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

function Welcome() {
    const [info,setInfo]=useState({ip:null,port:null,pw:null});
    const connect=()=>{
        const data=localStorage.getItem("server_data");
        if(data===null)localStorage.setItem("server_data",JSON.stringify(info));
        else return;
    }
    const onChangeIP=(e)=>{
        setInfo({...info,ip:e.target.value});
    }
    const onChangePort=(e)=>{
        setInfo({...info,port:e.target.value});
    }
    const onChangePW=(e)=>{
        setInfo({...info,pw:e.target.value});
    }
    return (
        <div className="welcome">
        <div className="login">
        <span>Remote Console Login <VpnKeyIcon/></span>
        <div className="input">
        <TextField label="IP address" onChange={(e)=>{onChangeIP(e);}}
        inputProps={{style:{color:"white"}}} InputLabelProps={{style:{color:"gray"}}}/>
        <TextField label="Port" onChange={(e)=>{onChangePort(e);}}
         inputProps={{style:{color:"white"}}} InputLabelProps={{style:{color:"gray"}}}/>
        <TextField label="Password" type="password" onChange={(e)=>{onChangePW(e);}}
        inputProps={{style:{color:"white"}}} InputLabelProps={{style:{color:"gray"}}}/>
        <Button variant="contained" color="primary" href="/console" onClick={connect}>Connect</Button>
        </div>
        </div>
        </div>
    )
}

export default Welcome;
