import { Block, Text, theme } from 'galio-framework';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { DrawerItem as DrawerCustomItem, Icon } from '../components';

import Images from '../constants/Images';
import React from 'react';
import nowTheme from '../constants/Theme';
import { useSafeArea } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width } = Dimensions.get('screen');
let userType = '';
function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {

    AsyncStorage.getItem('logged_user_rights')
    .then((value) => {
      userType = value;
    });
  const insets = useSafeArea();
  const screens = ['Concerts', 'Technical Support'];
  const screens_management = ['Add Concert', 'Add Technical Support'];
  return (
    <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon name="align-left-22x" family="NowExtra" size={15} color={'black'} />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          {userType == 'admin' ?
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
            <Block
              style={{
                borderColor: 'black',
                width: '93%',
                borderWidth: StyleSheet.hairlineWidth,
                marginHorizontal: 10,
              }}
            />
            <Text
              color={nowTheme.COLORS.BLACK}
              style={{
                marginTop: 30,
                marginLeft: 20,
                marginBottom: 10,
                fontFamily: 'montserrat-regular',
                fontWeight: '300',
                fontSize: 12,
              }}
            >
              APP MANAGEMENT
            </Text>
          </Block>
: null }
          {userType == 'admin' ? screens_management.map((item, index_m) => {
                      return (
                        <DrawerCustomItem
                          title={item}
                          key={index_m}
                          navigation={navigation}
                          focused={state.index_m === index_m ? true : false}
                        />
                      );
                    }) : null}
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
                      <Block
                        style={{
                          borderColor: 'black',
                          width: '93%',
                          borderWidth: StyleSheet.hairlineWidth,
                          marginHorizontal: 10,
                        }}
                      />
                    </Block>
          <DrawerCustomItem title="LOGOUT" navigation={navigation}/>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: nowTheme.COLORS.PRIMARY
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE * 3,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  headerIcon: {
    marginTop: -30,
  },
  logo: {
    height: 37,
    width: 120
  },
});

export default CustomDrawerContent;
