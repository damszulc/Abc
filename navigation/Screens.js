import { Animated, Dimensions, Easing } from 'react-native';
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from '../constants';

import Articles from '../screens/Articles';
import { Block } from 'galio-framework';
import Components from '../screens/Components';
import Technique from '../screens/Technique';

// drawer
import CustomDrawerContent from './Menu';
// screens
import Concerts from '../screens/Concerts';
import Onboarding from '../screens/Onboarding';
import Pro from '../screens/Pro';
import Profile from '../screens/Profile';
import Showtech from '../screens/Showtech';
import React from 'react';
import Register from '../screens/Register';
import SettingsScreen from '../screens/Settings';
import AddConcert from '../screens/AddConcert';
import AddTechnqiue from '../screens/AddTechnique';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Components"
        component={Components}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Articles"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function TechniqueStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Audio Visual Support"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
    <Stack.Screen
            name="Audio Visual Support"
            component={Technique}
            options={{
              header: ({ navigation, scene }) => (
                <Header title="Montaż audio-wizualny" search options navigation={navigation} scene={scene} />
              )
            }}
          />
          <Stack.Screen
            name="Pro"
            component={Pro}
            options={{
              header: ({ navigation, scene }) => (
                <Header title="" back white transparent navigation={navigation} scene={scene} />
              ),
              headerTransparent: true,
            }}
          />
          <Stack.Screen
                  name="Showtech"
                  component={Showtech}
                  options={{
                    header: ({ navigation, scene }) => (
                      <Header title="" title="Informacje o montażu" back scene={scene} />
                    ),
                    headerTransparent: false,
                  }}
                />
    </Stack.Navigator>
  );
}

function AddConcertStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Add Concert"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Add Concert2"
        component={AddConcert}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Dodaj koncert" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
       <Stack.Screen
              name="Concerts2"
              component={Concerts}
              options={{
                header: ({ navigation, scene }) => (
                  <Header title="Koncerty" search options navigation={navigation} scene={scene} />
                ),
                cardStyle: { backgroundColor: '#FFFFFF' },
              }}
            />
    </Stack.Navigator>
  );
}

function AddTechniqueStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Add Audio Visual Support"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Add Audio Visual Support 2"
        component={AddTechnqiue}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Dodaj montaż" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Account"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="" navigation={navigation} scene={scene} />
          ),

        headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Profile 2"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Profile" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" back white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ShowtechStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Showtech"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
     <Stack.Screen
                   name="Profile"
                   component={Profile}
                   options={{
                     header: ({ navigation, scene }) => (
                       <Header title="Informacje o koncercie" back scene={scene} />
                     ),
                     headerTransparent: false,
                   }}
                 />
    </Stack.Navigator>
  );
}

function ConcertsStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Concerts"
        component={Concerts}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Koncerty" search options navigation={navigation} scene={scene} />
          )
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" back white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                header: ({ navigation, scene }) => (
                  <Header title="Informacje o koncercie" back scene={scene} />
                ),
                headerTransparent: false,
              }}
            />

    </Stack.Navigator>
  );
}

function RegisterStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Logowanie" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      screenOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Concerts"
    >
      <Drawer.Screen
        name="Concerts3"
        component={ConcertsStack}
        options={{
          headerShown: false,
        }}
      />
       <Drawer.Screen
              name="Register"
              component={RegisterStack}
              options={{
                headerShown: false,
              }}
            />
      <Drawer.Screen
        name="Components"
        component={ComponentsStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Articles"
        component={ArticlesStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Audio Visual Support"
        component={TechniqueStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Showtech"
        component={ShowtechStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Add Concert"
        component={AddConcertStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Add Audio Visual Support"
        component={AddTechniqueStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
       <Stack.Screen
                    name="Register"
                    component={Register}
                    option={{
                      headerTransparent: true,
                    }}
                  />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
