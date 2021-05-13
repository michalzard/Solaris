import React from 'react'
import "./StatCard.scss";
import AddIcon from '@material-ui/icons/Add';

function StatCard({icon,actionIcon,title,value,desc,onClickCallback,className,id}) {
    return (
        <div className={`stat-card ${className ? className : null}`} id={`${id ? id : null}`}>
   
        <div className="header">
        <span className="icon">{icon ? icon : <AddIcon fontSize={"large"}/>}</span>
        <div className="info"> 
        <span className="title">{title ? title : "Title"}</span>
        <span className="value">{value ? value : "Value"}</span>
        </div>
        </div>
        
        <div className="action">
        <span className="icon" onClick={onClickCallback ? onClickCallback : null}>
        {actionIcon ? actionIcon : <AddIcon />}</span>
        <span className="name">{desc ? desc : "Description"}</span>
        </div>
        </div>
    )
}

export default StatCard;
