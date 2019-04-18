import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";
import { Header, Button, CardSection, Spinner } from "./components/common";
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
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button
              onPress={() => {
                firebase.auth().signOut();
              }}
            >
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.spinnerView}>
            <Spinner size="small" />
          </View>
        );
    }

    // if (this.state.loggedIn) {
    //   return (
    //     <CardSection>
    //       <Button>Log Out</Button>
    //     </CardSection>
    //   );
    // }
    // return <LoginForm />;
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

const styles = {
  spinnerView: {
    alignSelf: "center"
  }
};

export default App;
