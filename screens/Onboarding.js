import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import AsyncStorage from '@react-native-async-storage/async-storage'

    let userId = 0;

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startEkran: "",
      isLoading: true
    };

     AsyncStorage.getItem('logged_user_id').then((value) => {
        this.setState({user_id: value, startEkran: (value>0)?"App":"Register"});
     });
  }

  render() {
    const { navigation } = this.props;

    let button_start = (this.state.startEkran!="") ?
                    <Button
                      shadowless
                      style={styles.button}
                      color={nowTheme.COLORS.PRIMARY}
                      onPress={() => navigation.navigate(this.state.startEkran)}
                    >
                      <Text
                        style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                        color={theme.COLORS.WHITE}
                      >
                        ROZPOCZNIJ
                      </Text>
                    </Button> : null;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={Images.Onboarding}
            style={{ flex: 1, height: height, width, zIndex: 1 }}
          />
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle>
                <Image source={Images.NowLogo} style={{ width: 250, height: 124, bottom: 200, position: 'absolute' }} />
              </Block>
              <Block middle row
                style={{
                  marginLeft: theme.SIZES.BASE * 2,
                  marginRight: theme.SIZES.BASE * 2
                }}>
                <Text
                  color="white"
                  size={10}
                  style={{ fontFamily: 'montserrat-regular' }}
                >
                  (v1.7) Zaprojektowane i wykonane
                  przez j7technologies
                </Text>
              </Block>

              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2
                }}
              >
                {button_start}
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
});
