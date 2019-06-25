import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';
import logo from './assets/logo.jpg';

export default createAppContainer(
  createStackNavigator({
    Feed,
    New,
  }, {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#000',
      headerTitle: <Image style={{ alignSelf: "center" }} source={logo}/>
    },
    headerLayoutPreset: 'center',
    mode: 'modal',
  })
);