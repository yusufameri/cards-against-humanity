import HomeScreen from "./Screens/HomeScreen/HomeScreen"
import JoinPartyScreen from "./Screens/JoinPartyScreen/JoinPartyScreen"
import StartGameScreen from "./Screens/StartGameScreen/StartGameScreen"
import PlayerSelectionScreen from './Screens/PlayerSelectionScreen/PlayerSelectionScreen'
import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import Screen from "./components/Screen/Screen"

function App() {
  return (
    <BrowserRouter>
      <Screen>
        <Route exact path ="/" component = {HomeScreen}/>
        <Route
          exact path='/join/:partyCode'
          render={(props) => <StartGameScreen {...props}  />} 
        />
        <Route
          exact path='/join'
          render={(props) => <JoinPartyScreen {...props} />} 
        />
        <Route
          exact path='/:partyCode'
          component={PlayerSelectionScreen} 
        />
      </Screen>
    </BrowserRouter>
  );
}

export default App;
