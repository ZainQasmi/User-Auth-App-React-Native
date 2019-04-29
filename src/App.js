import React, { Component } from "react";
import { View } from "react-native";
import { Header, Button, Spinner, CardSection } from "./components/common";
import LoginForm from "./components/LoginForm";
import AlbumList from "./components/AlbumList";
import RegistrationForm from "./components/RegistrationForm";
// import RegistrationForm from "./components/RegistrationForm";

class App extends Component {
  state = { loggedIn: "LoginPage", msg: "" };

  homePage = () => {
    console.log("it works");
    this.setState({ loggedIn: "Home" });
  };

  loginPage = () => {
    this.setState({ loggedIn: "LoginPage" });
  };

  loginPageAfterRegistration = () => {
    this.setState({
      loggedIn: "LoginPage",
      msg: "Registration Success! You may now login"
    });
  };

  registrationPage = () => {
    this.setState({ loggedIn: "RegisterPage" });
  };

  renderContent() {
    switch (this.state.loggedIn) {
      case "Home":
        return (
          <React.Fragment>
            <Header>Albums</Header>
            <CardSection>
              <Button onPress={this.loginPage}>Log Out</Button>
            </CardSection>
            <AlbumList />
          </React.Fragment>
        );
      case "LoginPage":
        return [
          <Header key={1}>Authentication</Header>,
          <LoginForm
            key={2}
            logIn={this.homePage}
            registerMe={this.registrationPage}
            msg={this.state.msg}
          />
        ];
      case "RegisterPage":
        return [
          <Header key={1}>Register</Header>,
          <RegistrationForm
            key={2}
            onRegister={this.loginPageAfterRegistration}
            onCancel={this.loginPage}
          />
        ];
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

const styles = {
  spinnerView: {
    alignSelf: "center"
  }
};

export default App;
