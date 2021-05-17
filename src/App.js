import "./styles/App.scss";
import {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Status from "./components/Status";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";

import Console from "./components/Console/Console";
import ServerInfo from "./components/Info/ServerInfo";
import ServerConfig from "./components/Config/ServerConfig";
import ServerStats from "./components/Statistics/ServerStats";

function App() {
  const d=localStorage.getItem("server_data");
  const connection=JSON.parse(d);
  let ws=new WebSocket(`ws://${connection.ip}:${connection.port}/${connection.pw}`);
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
      <Router>
      {ws.readyState===WebSocket.CLOSING || ws.readyState===WebSocket.CLOSED ? <Redirect to="/"/> : null}
      <Switch>
      <Route path="/console">
      <Navbar/>  
      <Console ws={ws}/>
      <Status/>
     </Route>
     <Route path="/stats">
     <Navbar/>
     <ServerStats ws={ws}/>
     <Status/>
     </Route>
     <Route path="/info">
     <Navbar/>
     <ServerInfo ws={ws}/>
     <Status/>
     </Route>
     <Route path="/config">
     <Status/>
     <Navbar/>
     <ServerConfig ws={ws}/>
     <Status/>
     </Route>
     <Route path="/">
     <Welcome/>
     </Route>
     </Switch>
     </Router>
    </div>
  );
}

export default App;
