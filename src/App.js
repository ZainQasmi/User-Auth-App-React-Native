import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";
import { Header, Button } from "./components/common";
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = { loggedIn: false };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyASS8GEv5poQ7pT5OxPSo3Lz1UcGeZjsSE",
      authDomain: "auth-react-alpha.firebaseapp.com",
      databaseURL: "https://auth-react-alpha.firebaseio.com",
      projectId: "auth-react-alpha",
      storageBucket: "auth-react-alpha.appspot.com",
      messagingSenderId: "280500996601"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    if (this.state.loggedIn) {
      return <Button>Log Out</Button>;
    }
    return <LoginForm />;
  }

  render() {
    return (
      <View>
        <Header>Authentication</Header>
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
