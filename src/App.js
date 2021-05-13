import "./styles/App.scss";
import {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Status from "./components/Status";
import Navbar from "./components/Navbar";
import Console from "./components/Console/Console";
import ServerInfo from "./components/Info/ServerInfo";
import ServerConfig from "./components/Config/ServerConfig";
import ServerStats from "./components/Statistics/ServerStats";

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
      <Router>
      <Navbar/>
      <Switch>
     <Route path="/console">
     <Console ws={ws}/>
     </Route>
     <Route path="/stats">
     <ServerStats ws={ws}/>
     </Route>
     <Route path="/info">
     <ServerInfo ws={ws}/>
     </Route>
     <Route path="/config">
     <ServerConfig ws={ws}/>
     </Route>
     </Switch>
     <Status/>
     </Router>
    </div>
  );
}

export default App;
