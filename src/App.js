import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";
import { Header, Button, Spinner, CardSection } from "./components/common";
import LoginForm from "./components/LoginForm";
import AlbumList from "./components/AlbumList";

class App extends Component {
  state = { loggedIn: null };

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
    switch (this.state.loggedIn) {
      case true:
        return (
          <React.Fragment>
            <Header>Albums</Header>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
            </CardSection>
            <AlbumList />
          </React.Fragment>
        );
      case false:
        return [<Header key={1}>Authentication</Header>, <LoginForm key={2} />];
      default:
        return (
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        );
    }
  }

  render() {
    return <View style={{ flex: 1 }}>{this.renderContent()}</View>;
  }
}

export default App;

// <React.Fragment>
//             <AlbumList />
//             <CardSection>
//               <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
//             </CardSection>
//           </React.Fragment>
