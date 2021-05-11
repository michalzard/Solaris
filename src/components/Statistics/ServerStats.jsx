import React from 'react'
import "./ServerStats.scss";
// import PlayerList from "./PlayerList";
import PerformanceChart from './PerformanceChart';

function ServerStats({ws}) {
    return (
        <div className="server-stats">
           <PerformanceChart/>
        </div>
    )
}

export default ServerStats
