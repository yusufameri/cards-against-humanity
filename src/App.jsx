import HomeScreen from "./Screens/HomeScreen/HomeScreen"
import JoinPartyScreen from "./Screens/JoinPartyScreen/JoinPartyScreen"
import StartGameScreen from "./Screens/StartGameScreen/StartGameScreen"
import PlayerSelectionScreen from './Screens/PlayerSelectionScreen/PlayerSelectionScreen'
import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import Screen from "./SharedComponents/Screen/Screen"


function App() {
  return (
    <BrowserRouter>
      <Screen>
        <Route exact path ="/" component = {HomeScreen}/>
        <Route
          exact path='/game/:partyCode' // need to add regex to this partyCode
          // access the route param via => props.match.params.partyCode
          render={(props) => <StartGameScreen {...props}  />} 
        />
        <Route
          exact path='/join-party' // you can add additional props like below...
          render={(props) => <JoinPartyScreen {...props} isAuthed={true} />} 
        />
        <Route
          exact path='/gameplay'
          component={PlayerSelectionScreen} 
        />
      </Screen>
    </BrowserRouter>
  );
}

export default App;
