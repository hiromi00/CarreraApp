import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from 'app/screens/Login';
import { SignUp } from './SignUp';
import { Home } from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

const { Navigator, Screen } = createNativeStackNavigator();

export const MainStack = () => {
  //const styles = useStyles();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const get = async () => {
    await AsyncStorage.getItem('DatosU').then((value) => {
      if (value !== null) {
        setIsSignedIn(true);
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <NavigationContainer>
      <Navigator>
        {isSignedIn ? (
          <>
            <Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
          </>
        ) : (
          <>
            <Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Screen
              options={{ headerShown: false }}
              name="SignUp"
              component={SignUp}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};
