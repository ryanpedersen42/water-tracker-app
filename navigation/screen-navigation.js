import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AddScreen from '../screens/add-screen';
import GoalScreen from '../screens/goal-screen';


const defaultStackNavOptions = {
  headerTintColor: 'blue',
  headerTitle: 'Water App'
};

const TabNavigator = createBottomTabNavigator({
  Add: AddScreen,
  Goal: GoalScreen,
}, 
{
  defaultNavigationOptions: defaultStackNavOptions
});


export default createAppContainer(TabNavigator);