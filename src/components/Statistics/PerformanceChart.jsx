import React,{useState} from 'react'
import "./PerformanceChart.scss";
import {Chart, Line} from "react-chartjs-2";
import {Button,ButtonGroup} from "@material-ui/core";
Chart.defaults.plugins.legend.display=false;

function PerformanceChart({subtitle,title,color,fill,data}) {
    const highlightRed="#f50057";
    const [sortBy,setSortBy]=useState("Monthly");
    const labels={
    Daily:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    Monthly:["Jan","Feb","Mar","Apr","May","Jun","Sep","Oct","Nov","Dec"],
    Yearly:["2020",new Date().getFullYear()],
    }
    return (
        <div className="performanceChart">
        <div className="chart_info">
        <div className="titles">
        <span className="subtitle">{subtitle ? subtitle : "Total Performance"}</span>
        <span className="title">{title ? title : "Performance"}</span>
        </div>

        <div className="buttons">
        <ButtonGroup color="secondary" aria-label="outlined primary button group">
        <Button style={{backgroundColor:sortBy==="Daily" ? highlightRed : null,
        color:sortBy==="Daily" ? "white" : null}} onClick={()=>{setSortBy("Daily")}}>Daily</Button>
        <Button style={{backgroundColor:sortBy==="Monthly" ? highlightRed : null,
        color:sortBy==="Monthly" ? "white" : null}} onClick={()=>{setSortBy("Monthly")}}>Monthly</Button>
        <Button style={{backgroundColor:sortBy==="Yearly" ? highlightRed : null,
        color:sortBy==="Yearly" ? "white" : null}} onClick={()=>{setSortBy("Yearly")}}>Yearly</Button>
        </ButtonGroup>
        </div>
        </div>

        <div className="graph">
        <Line
        data={{
        labels:labels[sortBy],
        datasets:[
            {
                data: data ? data  : [50,100,70,35,50,55,5,10,15,20,25],
                borderColor: color ? `rgba(${color.r}, ${color.g},${color.b}, 1)` : "rgba(255,0,0,1)",
                backgroundColor:color ? `rgba(${color.r}, ${color.g},${color.b},.1)` : "rgba(255,0,0,.1)",
                fill:fill ? true : false,
                tension:.2,
            }
        ]
        }}
        width={400}
        height={200}
        options={{
        maintainAspectRatio:false,
        }}
        />
        </div>
        </div>
    )
}


export default PerformanceChart;
