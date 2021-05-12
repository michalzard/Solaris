import React from 'react'
import "./StatCard.scss";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ReplayIcon from '@material-ui/icons/Replay';

function StatCard() {
    return (
        <div className="stat-card">
            
        <div className="header">
        <span className="icon"><AcUnitIcon fontSize={"large"}/></span>
        <div className="info"> 
        <span className="title">Number</span>
        <span className="value">50</span>
        </div>
        </div>
        
        <div className="action">
        <span className="icon"><ReplayIcon fontSize={"small"}/></span>
        <span className="name">Update now</span>
        </div>
        </div>
    )
}

export default StatCard;
