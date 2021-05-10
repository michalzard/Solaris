import "./styles/App.scss";
import Console from "./components/Console";
import {useEffect} from "react";

function App() {
  let ws=new WebSocket(`ws://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_PW}`);
  useEffect(()=>{
    ws.onopen=()=>{
        console.log("connection established"); 
    }
    ws.onclose=(e)=>{
    e.wasClean ? console.log(`connection closed cleanly`) : console.log(`connection died`);
}
});
  return (
    <div className="App">
     <Console ws={ws}/>
    </div>
  );
}

export default App;
