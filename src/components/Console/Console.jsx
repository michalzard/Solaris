import React,{useEffect, useState} from 'react'
import "./Console.scss";
import {TextField,Button,Tooltip} from "@material-ui/core";
import CodeIcon from '@material-ui/icons/Code';
import ClearIcon from '@material-ui/icons/Clear';

function Console({ws}) {
    const [messages,setMessages]=useState([]);
    const [currentInput,setCurrentInput]=useState("");
    const [commandEnabled,setCommandEnabled]=useState(false);
    const [title,setTitle]=useState("");
    useEffect(()=>{
        setTimeout(()=>{
            ws.send(JSON.stringify({
                Message:"status",
            }));
        },200);
    },[ws]);
    ws.onmessage=(e)=>{
    const data=JSON.parse(e.data);
    if(data){
        //first time status is called its not shown in console but is used to display title instead 
        if(data.Message.includes("hostname") && !title){
        const title=data.Message.split("\n")[0].replace("hostname:","");
        const players=data.Message.split("\n")[3].replace("players:","");
        setTitle(`${title} , ${players}`);
        }else{
            setMessages(prevState=>([...prevState,data]));
        }
    }
}
    const onInputChange=(e)=>{
        setCurrentInput(e.target.value);
    }
    const sendToServer=()=>{
    if(currentInput.length>0){
    if(commandEnabled){
    ws.send(JSON.stringify({Message:currentInput.trim(), Name:"Console"}));
    }else ws.send(JSON.stringify({Message:`say ${currentInput}`, Name:"Console"}));
    setCurrentInput("");
    }
    }
    const changeInputMode=()=>{
    setCommandEnabled(!commandEnabled);
    }
    const clearConsole=()=>{
        setMessages([]);
    }
    const onEnterSubmit=(e)=>{
        if(e.key==="Enter") sendToServer();
        if(e.key==="Tab") {
        const textfield=document.querySelector("input");
        changeInputMode();
        setTimeout(()=>{textfield.focus();},300)
    }
    }

    return (
        <div className="console">
        <span className="clear"> <div style={{paddingLeft:"5px",color:"#BB86FC"}}>{title}</div>
        <span onClick={clearConsole}>
        <Tooltip title="Clear the console" placement="left-end">
        <ClearIcon/>
        </Tooltip>
        </span></span>
        <div className="server_messages">
        {messages.map((m,i)=>{
        return m.Message.length>0 ? <ConsoleMessage key={i} message={m} /> : null})}
        </div>
        <div className="input">
        <Tooltip title="Change input mode" placement="top">
        <CodeIcon className="command" style={{margin:"10px",color:commandEnabled ? "lightgreen" : null}} onClick={changeInputMode}/>
        </Tooltip>
        <TextField fullWidth placeholder={commandEnabled ? "Send command to server" : "Send message to server"} 
        inputProps={{style:{color:"white"}}} onChange={onInputChange} onKeyDown={(e)=>{onEnterSubmit(e)}} value={currentInput}/>
        <Button variant="contained" color="primary" onClick={()=>{sendToServer();}}>Send</Button>
        </div>
        </div>
    )
}

export default Console;


function ConsoleMessage({message}){
const msg=message.Message.includes("{") ? JSON.parse(message.Message) : message.Message;

return(
    <div className="console-message">
    {
    message.Message.includes("{") ?
    <>
    <span className={`${message.Type}`}>[{message.Type}] </span>
    <span>{msg.Username}</span> : <span>{msg.Message}</span>
    </>
    : 
    <>
    <span className={`${message.Type}`}>[{message.Type}]</span>
    <span >{message.Message}</span>
    </>
    }
    </div>
)
}