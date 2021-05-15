import React from 'react'
import "./PlayerDataTable.scss";
import {TableBody,Table,TableCell,TableContainer,TableHead,TableRow,Tooltip} from '@material-ui/core';
import BanIcon from '@material-ui/icons/NotInterested';
import KickIcon from '@material-ui/icons/ExitToApp';

function PlayerDataTable({ws,data,setData}) {
    const kickUser=(user,reason)=>{
    if(user && reason){
      ws.send(JSON.stringify({
        Message:`kick ${user.id} ${reason}`,
        Name:"Console",
      }));
      let filteredArray = data.filter(item => item.id !== user.id)
      setData(filteredArray);
    }
    }
    const banUserId=(user,reason)=>{
      if(user && reason){
        ws.send(JSON.stringify({
          Message:`ban ${user.id} ${reason}`,
          Name:"Console",
        }));
        let filteredArray = data.filter(item => item.id !== user.id)
        setData(filteredArray);
      }
    }
    return (
         <TableContainer style={{width:"50%"}} className="player-dataTable">
      <Table className="player-dataTable">
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
        <TableCell className="datacell">
        <Tooltip title="Kick User" placement="top">
        <KickIcon className="tableIcon" onClick={()=>{kickUser(user,"Rules");}}/>
        </Tooltip>
        <Tooltip title="Ban User" placement="top">
        <BanIcon className="tableIcon" onClick={()=>{banUserId(user,"Rules");}}/>
        </Tooltip>
        </TableCell>
        </TableRow>
        </TableBody>
        })}
      </Table>
    </TableContainer>
    )
}

export default PlayerDataTable;
