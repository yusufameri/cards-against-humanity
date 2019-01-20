import React from 'react'

import Screen from "../../SharedComponents/Screen/Screen"
import Top from "../../SharedComponents/Top/Top"
import Title from "../../SharedComponents/Title/Title"
import Bottom from "../../SharedComponents/Bottom/Bottom"
import Button from "../../SharedComponents/Button/Button"
import Card from "../../SharedComponents/Card/Card"
import Footer from "../../SharedComponents/Footer/Footer"
import "./JoinPartyScreen.css"

class JoinPartyScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        partyCode: ""
      }
      this.updatePartyCode = this.updatePartyCode.bind(this);
    }

    updatePartyCode(e) {
      // console.log(`updatePartyCode, ${e.target.value}`);
      
      this.setState({
        partyCode: e.target.value
      })
    }

    render() {
      return (
        <Screen>
          <Top>
            <Card cardType="Title" />
          </Top>
          <Bottom>
            <Title text="Join an existing party"/>
            <div className="enterCode center">
              <p className="label">Enter the 5 digit Party Code</p>
              <input className ="input" type="text" name="partyCode" placeholder="cah.co/<enter_party_code>" onChange={this.updatePartyCode}/>
            </div>
            <Button text = "Join Party" className="center" link={`game/${this.state.partyCode}`}/>
            <Footer>
              Like us on <a href="http://www.facebook.com/yusufameri"> Facebook!</a>
            </Footer>
          </Bottom>
        </Screen>
      );
    }
}

export default JoinPartyScreen;
