import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Register extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      email : '',
      password : '',
      check_textInputChange : false,
      secureTextEntry : true,
    };
  }
  InsertRecord=()=>{
    var Email = this.state.email;
    var Password = this.state.password;

    if ((Email.length==0) || (Password.length==0)){
      alert("Proszę wypełnić pola logowania!");
    }else{
      var APIURL = "http://anseba.nazwa.pl/app/login.php";

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };

      var Data ={
        Email: Email,
        Password: Password
      };

      fetch(APIURL,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
        if (Response[0].Message == "Success") {
          console.log("true")
          AsyncStorage.setItem('logged_user_id', Response[0].UserId);
          AsyncStorage.setItem('logged_user_rights', Response[0].UserType);
          this.props.navigation.navigate("App");
        }
        else {
            alert("Nieprawidłowe dane logowania!");
        }
        console.log(Data);
      })
      .catch((error)=>{
        console.error("ERROR FOUND" + error);
      })
    }
  }

  render() {
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Logowanie
                      </Text>
                    </Block>

                  </Block>

                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="E-mail"
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                              onChangeText={email=>this.setState({email})}
                            />
                          </Block>
                          <Block width={width * 0.8}>
                                                      <Input
                                                        placeholder="Hasło"
                                                        secureTextEntry={true}
                                                        style={styles.inputs}
                                                        iconContent={
                                                          <Icon
                                                            size={16}
                                                            color="#ADB5BD"
                                                            name="caps-small2x"
                                                            family="NowExtra"
                                                            style={styles.inputIcons}
                                                          />
                                                        }
                                                        onChangeText={password=>this.setState({password})}
                                                      />
                                                    </Block>

                        </Block>
                        <Block center>
                          <Button color="primary" round style={styles.createButton} onPress={()=>{this.InsertRecord()}}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Zaloguj się
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.4 : height * 0.4,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

export default Register;
