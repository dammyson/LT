import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from 'native-base';
import Splash from '../screens/onBoarding/Splash';
import SignUP from '../screens/user/SignUp';
import SignIn from '../screens/user/SignIn';
import Welcome from '../screens/onBoarding/Welcome';
import { navigationRef } from '../../rootNavigation'
import Home from '../screens/user/Home';
import Verify from '../screens/user/Verify';
import SignPassword from '../screens/user/SignPassword';
import ForgotPassword from '../screens/user/ForgotPassword';
import ChangePassword from '../screens/user/ChangePassword';


//console.disableYellowBox = true;

class AppStack extends Component {

  render() {
    const Stack = createStackNavigator();
    return (
      <Root>
        <NavigationContainer ref={navigationRef} >
      
          <Stack.Navigator
          screenOptions={{ 
              gestureEnabled: false,
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#7862ff' }, 
              headerShown: false,
             }}
             initialRouteName="Splash">

            <Stack.Screen name="Splash" component={Splash}  />
            <Stack.Screen name="Welcome" component={Welcome}  />
            <Stack.Screen name="SignIn" component={SignIn}  />
            <Stack.Screen name="SignUP" component={SignUP}  />
            <Stack.Screen name="Home" component={Home}  />
            <Stack.Screen name="SignPassword" component={SignPassword}  />
            <Stack.Screen name="Verify" component={Verify}  />
            <Stack.Screen name="ForgetPassword" component={ForgotPassword}  />
            <Stack.Screen name="ChangePassword" component={ChangePassword}  />
          
          </Stack.Navigator>
        </NavigationContainer>
        </Root>
      );
  }

}
export default AppStack;