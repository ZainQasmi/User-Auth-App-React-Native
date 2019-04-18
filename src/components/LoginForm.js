import React, { Component } from "react";
import { Text } from "react-native";
import firebase from "firebase";
import { Button, Card, CardSection, Input, Spinner } from "./common";

// Text inputs by default do not have a default height, width or styling just like images. FML

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
    styleColor: ""
  };

  onSignupSuccess = () => {
    this.setState({
      error: "Account Created ",
      loading: false,
      styleColor: styles.okTextStyle
    });
  };

  onLoginSuccess = () => {
    this.setState({
      error: "Authentication Success",
      loading: false,
      styleColor: styles.passTextStyle
    });
  };

  onLoginFail = () => {
    this.setState({
      error: "Authentication Failed",
      loading: false,
      styleColor: styles.errorTextStyle
    });
  };

  onButtonPress = () => {
    const { email, password } = this.state;

    this.setState({ error: "", loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onSignupSuccess)
          .catch(this.onLoginFail);
      });
  };

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.onButtonPress}>Login</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          {/* Taking input - Creating controlled components inside React */}
          <Input
            placeholder="xyz@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry={true}
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
        </CardSection>

        {/* <Text style={styles.errorTextStyle}>{this.state.error}</Text> */}
        <Text style={this.state.styleColor}>{this.state.error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  passTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "green"
  },
  okTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "orange"
  }
};

export default LoginForm;
