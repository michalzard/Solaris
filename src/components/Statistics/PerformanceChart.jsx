import React from 'react'
import "./PerformanceChart.scss";
import {Chart, Line} from "react-chartjs-2";
import {Button,ButtonGroup} from "@material-ui/core";
Chart.defaults.plugins.legend.display=false;

function PerformanceChart() {
    const highlightRed="#f50057";
    const bruh=null;
    return (
        <div className="performanceChart">
        <div className="chart_info">
        <span className="title">Performance</span>
        <span className="buttons">
        <ButtonGroup color="secondary" aria-label="outlined primary button group">
        <Button>Daily</Button>
        <Button>Monthly</Button>
        <Button>Yearly</Button>
        </ButtonGroup>
        </span>
        </div>

        <div className="graph">
        <Line
        data={{
        labels:["Jan","Feb","Mar","Apr","May","Jun","Sep","Oct","Nov","Dec"],
        datasets:[
            {
                label: "Players",
                data:[12,19,3,5,2,32,10,12,19,3,5,2,32,10],
                borderColor:"rgba(250, 150, 50, 1)",
                backgroundColor:"rgba(250, 150, 50,0.1)",
                fill:true,
                tension:.2
            }
        ]
        }}
        width={200}
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
