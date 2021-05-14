import React from 'react'
import "./PlayerDataTable.scss";
import {TableBody,Table,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';


function PlayerDataTable({data}) {
    //{id:13212321312,displayName:deeeznutsmyguy}
    return (
         <TableContainer component={Paper}>
      <Table className="player-dataTable" aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>

          </TableRow>
        </TableHead>
        {
        data.map((user,i)=>{
        return  <TableBody key={i}>
        <TableRow>
        <TableCell component="th" scope="row">
        <a href={`https://steamcommunity.com/profiles/${user.id}/`} rel="noreferrer"
        target="_blank">{user.id}</a>
        </TableCell>
        <TableCell>{user.displayName}</TableCell>
        <TableCell>some icons</TableCell>
        </TableRow>
        </TableBody>
        })
       
        }
      </Table>
    </TableContainer>
    )
}

export default PlayerDataTable;
