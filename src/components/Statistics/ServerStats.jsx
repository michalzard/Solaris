import React, { useEffect } from 'react'
import "./ServerStats.scss";
//import {Button} from "@material-ui/core";
import PerformanceChart from './PerformanceChart';
import StatCard from './StatCard';
import { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import CachedIcon from '@material-ui/icons/Cached';

function ServerStats({ws}) {
    const [concurrentPlayers,setConcurrentPlayers]=useState("");
    const [display,setDisplay]=useState("");
    ws.onmessage=(e)=>{
        const data=JSON.parse(e.data);
        if(data.Message.includes("users")){
        console.log(data.Message);
        const connectedPlayers=data.Message.split("\n")[2].replace("users","") ;
        if(connectedPlayers!=="")setConcurrentPlayers(connectedPlayers);
        else setConcurrentPlayers("0");
        }else return;
    }
    useEffect(()=>{
        setTimeout(()=>{
        if(ws)ws.send(JSON.stringify({Message:"users", Name:"Console"}));
        },200);    
    },[ws]);
    

    const updateConcurrentInfo=()=>{
    const playerCard=document.getElementById("playerCard");
    if(playerCard && !playerCard.classList.contains("rotateAnimation")){
    ws.send(JSON.stringify({Message:"users", Name:"Console"}));
    playerCard.classList.add("rotateAnimation");
    setTimeout(()=>{playerCard.classList.remove("rotateAnimation");},1100);
    }
    }
    return (
        <div className="server-stats">
            <LeftSideBar/>
            <div className="content">
           <PerformanceChart color={{r:200,g:150,b:100}}
           subtitle="Total Players" title="Players" fill/>
            <StatCard title="Connected Players" id="playerCard" className="m-top" value={concurrentPlayers}  desc="Update now"
            onClickCallback={updateConcurrentInfo} icon={<PersonIcon fontSize="large"/>} actionIcon={<CachedIcon/>}/>
           </div>
        </div>
    )
}
// TODO:Performance chart needs to be connected to database


function LeftSideBar(){
    return(
        <div className="leftsidebar" style={{color:"white"}}>
        </div> 
    )
}
export default ServerStats
