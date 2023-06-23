import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home';
import { MaterialIcons } from '@expo/vector-icons';

const MainNav = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require('./src/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <MainNav.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <MainNav.Screen name="Login" component={LoginScreen} />
          <MainNav.Screen name="Register" component={RegistrationScreen} />
          <MainNav.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Posts',
            }}
          />
        </MainNav.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;