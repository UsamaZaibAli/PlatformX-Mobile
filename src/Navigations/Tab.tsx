import React from 'react';
import {darkColors} from '../Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Hackathon from '../Screens/Hackathon/Index';
import Workshop from '../Screens/Workshop/Index';
import Projects from '../Screens/Project/Index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Width} from '../Constants/Size';
import Post from '../Screens/Post/Index';

const Tab = createBottomTabNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          const ICON_SIZE = Width * 0.07;

          if (route.name === 'Post') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Hackathons') {
            iconName = focused ? 'code-slash' : 'code-sharp';
          } else if (route.name === 'Workshops') {
            iconName = focused ? 'ios-build' : 'ios-build-outline';
          } else if (route.name === 'Projects') {
            iconName = focused ? 'ios-bulb-sharp' : 'ios-bulb-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={ICON_SIZE} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: darkColors.TAB_BAR_ACTIVE_COLOR,
        inactiveTintColor: darkColors.TAB_BAR_INACTIVE_COLOR,
        iconStyle: {
          color: darkColors.TAB_BAR_ICON_COLOR,
          // fontSize: Sizes.normal * 10,
        },
        allowFontScaling: true,
        keyboardHidesTabBar: true,
        // activeBackgroundColor: darkColors.LIGHT_BACKGROUND,
        style: {
          backgroundColor: darkColors.BACKGROUND_COLOR,
          borderTopColor: 'transparent',
          // position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="Post"
        component={Post}
        options={{tabBarLabel: 'Home'}}
        // options={{
        //   tabBarBadge: 1,
        //   tabBarBadgeStyle: {
        //     backgroundColor: darkColors.BADGE_COLOR,
        //   },
        // }}
      />
      <Tab.Screen name="Hackathons" component={Hackathon} />
      <Tab.Screen name="Workshops" component={Workshop} />
      <Tab.Screen name="Projects" component={Projects} />
    </Tab.Navigator>
  );
};

export default TabScreens;
