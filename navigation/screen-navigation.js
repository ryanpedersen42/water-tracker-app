import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AddScreen from '../screens/add-screen';
import GoalScreen from '../screens/goal-screen';
// import StartupScreen from '../screens/start-screen';
import Colors from '../constants/Colors';

const TabNavigator = createBottomTabNavigator({
  Add: AddScreen,
  Goal: GoalScreen,
}, 
{
  tabBarOptions: {
    style: {
      backgroundColor: Colors.primaryColor,
      borderTopWidth: 0
    },
    labelStyle: {
      fontFamily: 'inconsolata-regular',
      fontSize: 20,
    },
    activeTintColor: Colors.accentColorOrange
  },
});

export default createAppContainer(TabNavigator);