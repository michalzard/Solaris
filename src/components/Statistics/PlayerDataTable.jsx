import React from 'react'
import "./PlayerDataTable.scss";
import {TableBody,Table,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';


function PlayerDataTable({data}) {
    //{id:13212321312,displayName:deeeznutsmyguy}
    return (
         <TableContainer component={Paper} className="player-dataTable">
      <Table className="player-dataTable" aria-label="simple table">
      <TableHead className="header">
          <TableRow>
            <TableCell className="datacell"><span>ID</span></TableCell>
            <TableCell className="datacell"><span>Name</span></TableCell>
            <TableCell className="datacell"><span>Actions</span></TableCell>

          </TableRow>
        </TableHead>
        {
        data.map((user,i)=>{
        return  <TableBody key={i}>
        <TableRow>
        <TableCell component="th" scope="row" className="datacell">
        <a href={`https://steamcommunity.com/profiles/${user.id}/`} rel="noreferrer"
        target="_blank">{user.id}</a>
        </TableCell>
        <TableCell className="datacell"><span>{user.displayName}</span></TableCell>
        <TableCell className="datacell" ><span>some icons</span></TableCell>
        </TableRow>
        </TableBody>
        })
       
        }
      </Table>
    </TableContainer>
    )
}

export default PlayerDataTable;
