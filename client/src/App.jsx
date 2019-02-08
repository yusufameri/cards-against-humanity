import React from 'react'

// Screens
import HomeScreen from "./Screens/HomeScreen/HomeScreen"
import JoinPartyScreen from "./Screens/JoinPartyScreen/JoinPartyScreen"
import StartGameScreen from "./Screens/StartGameScreen/StartGameScreen"
import PlayerSelectionScreen from './Screens/PlayerSelectionScreen/PlayerSelectionScreen'

// Routing
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact path="/"
          component={HomeScreen}
        />
        <Route
          exact path='/join/:partyCode'
          render={(props) => <StartGameScreen {...props} />}
        />
        <Route
          path='/join'
          render={(props) => <JoinPartyScreen {...props} />}
        />
        <Route
          path='/:partyCode'
          component={PlayerSelectionScreen}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
