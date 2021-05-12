import React from 'react'
import "./ServerStats.scss";
import {Button} from "@material-ui/core";
import PerformanceChart from './PerformanceChart';
import StatCard from './StatCard';

function ServerStats({ws}) {
    return (
        <div className="server-stats">
            <LeftSideBar/>
            <div className="content">
           <PerformanceChart color={{r:200,g:150,b:100}}
           subtitle="Total Players" title="Players" fill/>
            <StatCard/>
           </div>
        </div>
    )
}

function LeftSideBar(){
    return(
        <div className="leftsidebar" style={{color:"white"}}>
        <Button variant="contained" color="secondary">Stats</Button>
        </div> 
    )
}
export default ServerStats
