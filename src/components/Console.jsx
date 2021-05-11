import React,{useState} from 'react'
import "../styles/Console.scss";
import {TextField,Button,Tooltip} from "@material-ui/core";
import CodeIcon from '@material-ui/icons/Code';
import OnlineIcon from '@material-ui/icons/FiberManualRecord';
import ClearIcon from '@material-ui/icons/Clear';

function Console({ws}) {
    const [messages,setMessages]=useState([]);
    const [currentInput,setCurrentInput]=useState("");
    const [commandEnabled,setCommandEnabled]=useState(false);
    const wsConnected=true;
    ws.onmessage=(e)=>{
    const data=JSON.parse(e.data);
    if(data) setMessages(prevState=>([...prevState,data]));
    }
    const onInputChange=(e)=>{
        setCurrentInput(e.target.value);
    }
    const sendToServer=()=>{
    if(commandEnabled){
    ws.send(JSON.stringify({Message:currentInput.trim(), Name:"Console"}));
    }else ws.send(JSON.stringify({Message:`say ${currentInput}`, Name:"Console"}));
    setCurrentInput("");
    }
    const changeInputMode=()=>{
    setCommandEnabled(!commandEnabled);
    }
    const clearConsole=()=>{
        setMessages([]);
    }

    return (
        <div className="console">
        <span className="clear"><span onClick={clearConsole}>
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
        inputProps={{style:{color:"white"}}} onChange={onInputChange} value={currentInput} />
        <Button variant="contained" color="primary" onClick={()=>{sendToServer();}}>Send</Button>
        </div>
        <span className="status">
        <span className="info">
        <span>Server status</span>
        <Tooltip title={wsConnected ? "Online" : "Offline"} placement="right">
        <OnlineIcon style={{color: wsConnected ? "lightgreen" : "red"}}/>
        </Tooltip>
        </span>
            
        </span>
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