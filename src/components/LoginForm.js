import React, { Component } from "react";
import { Text } from "react-native";
import firebase from "firebase";
import { Button, Card, CardSection, Input, Spinner } from "./common";
import axios from "axios";

// Text inputs by default do not have a default height, width or styling just like images. FML

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
    styleColor: ""
  };

  componentDidMount() {
    this.setState({ error: this.props.msg, styleColor: styles.okTextStyle });
  }

  onLoginSuccess = () => {
    this.setState({
      error: "Authentication Success",
      loading: false,
      styleColor: styles.passTextStyle
    });
    this.props.logIn();
  };

  onLoginFail = () => {
    this.setState({
      error: "Authentication Failed",
      loading: false,
      styleColor: styles.errorTextStyle
    });
  };

  onLoginButtonPress = () => {
    const { email, password } = this.state;
    this.setState({ error: "", loading: true });

    axios
      .post("http://192.168.45.28:4000/users/authenticate", {
        username: email,
        password: password
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          this.onLoginSuccess();
        }
      })
      .catch(error => {
        console.log(error.response.data.message);
        if (error.response.status === 400) {
          this.onLoginFail();
        }
      });
  };

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return [
      <Button key={1} onPress={this.onLoginButtonPress}>
        Login
      </Button>,
      <Button key={2} onPress={this.props.registerMe}>
        Register
      </Button>
    ];
  }

  render() {
    return (
      <React.Fragment>
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
          <CardSection>{this.renderButton()}</CardSection>
        </Card>
        <Text style={this.state.styleColor}>{this.state.error}</Text>
      </React.Fragment>
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
