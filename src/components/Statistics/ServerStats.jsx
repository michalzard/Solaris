import React, { useEffect,useState} from 'react'
import "./ServerStats.scss";
import {Button} from "@material-ui/core";
import PerformanceChart from './PerformanceChart';
import StatCard from './StatCard';
import PersonIcon from '@material-ui/icons/Person';
import CachedIcon from '@material-ui/icons/Cached';
import PlayerDataTable from "./PlayerDataTable";

function ServerStats({ws}) {
    const [concurrentPlayers,setConcurrentPlayers]=useState("");
    const [display,setDisplay]=useState("Players");
    const [concurrentPlayerData,setConcurrentPlayerData]=useState([]);
    ws.onmessage=(e)=>{
        const data=JSON.parse(e.data);
        if(data.Message.includes("users")){
        const connectedPlayers=data.Message.split("\n")[2].replace("users","");
        const playerData=data.Message.split("\n")[1].split("/")[0].split(':');
           
        if(!concurrentPlayerData.includes(playerData[0])){
            setConcurrentPlayerData(prevState=>([...prevState,{id:playerData[0],displayName:playerData[1].split('"')[1]}]));        
        }
        if(connectedPlayers!=="")setConcurrentPlayers(connectedPlayers);
        else setConcurrentPlayers("0");
        }else return;
    }
    useEffect(()=>{
        setTimeout(()=>{
        if(ws)ws.send(JSON.stringify({Message:"users", Name:"Console"}));
        },200);    
    },[ws]);
    

    return (
        <div className="server-stats">
            <LeftSideBar setDisplay={setDisplay}/>
            <div className="content">
           { display==="Server" ? <ServerInfo ws={ws} concurrentPlayers={concurrentPlayers}/> : null }
           { display==="Players" ? <PlayersInfo ws={ws} data={concurrentPlayerData}/> : null }
           </div>
        </div>
    )
}
export default ServerStats;

function LeftSideBar({setDisplay}){
    return(
        <div className="leftsidebar">
        <Button variant="contained" color="secondary" onClick={()=>{setDisplay("Server")}}>Server</Button>
        <Button variant="contained" color="secondary" onClick={()=>{setDisplay("Players")}}>Players</Button>

        </div> 
    )
}


function ServerInfo({ws,concurrentPlayers}){
    const updateConcurrentInfo=()=>{
        const playerCard=document.getElementById("playerCard");
        if(playerCard && !playerCard.classList.contains("rotateAnimation")){
        ws.send(JSON.stringify({Message:"users", Name:"Console"}));
        playerCard.classList.add("rotateAnimation");
        setTimeout(()=>{playerCard.classList.remove("rotateAnimation");},1100);
        }
    }
    return(
        <>
        <PerformanceChart color={{r:200,g:150,b:100}} subtitle="Total Players" title="Players" fill/>
        <StatCard title="Connected Players" id="playerCard" className="m-top" value={concurrentPlayers}  desc="Update now"
        onClickCallback={updateConcurrentInfo} icon={<PersonIcon fontSize="large"/>} actionIcon={<CachedIcon/>}/>
        </>
    )
}

function PlayersInfo({ws,data}){
    useEffect(()=>{
    setTimeout(()=>{
    ws.send(JSON.stringify({
    Message:"users",
    }))
    },200);
    },[ws]);
  
    return(
        <>
        <div className="playerinfo">
        <PlayerDataTable data={data}/>
        </div>
        </>
    )
}