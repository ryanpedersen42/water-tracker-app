import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constants/Colors';
import ProgressScreen from '../screens/progress-screen';
import AddScreen from '../screens/add-screen';
import GoalScreen from '../screens/goal-screen';

const tabScreenConfig = {
  Add: {
    screen: ProgressScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-add-circle-outline" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Add</Text> : 'Add'
    }
  },
  Progress: {
    screen: ProgressScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-water-outline" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Progress</Text> : 'Progress'
    }
  }
}

const defaultStackNavOptions = {
  // headerStyle: {
  //   backgroundColor: Platform.OS === 'android' ? 'white' : ''
  // },
  headerTintColor: 'blue',
  headerTitle: 'Water Screen'
};

const TabNavigator = createBottomTabNavigator({
  Goal: GoalScreen,
  Add: AddScreen,
  Progress: ProgressScreen,
}, 
{
  defaultNavigationOptions: defaultStackNavOptions
});

const AddProgressTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor
      }
});

export default createAppContainer(TabNavigator);