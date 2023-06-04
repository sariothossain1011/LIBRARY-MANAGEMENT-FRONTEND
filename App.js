import "react-native-gesture-handler";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {  useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "./src/screens/Profile/Login";
import Registration from "./src/screens/Profile/Registration";
import Loader from "./src/components/Loader";
import Routes from "./src/navigations/Routes";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    authUser();
  }, [initialRouteName]);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName("Home");
        } else {
          setInitialRouteName("Home");
        }
      } else {
        setInitialRouteName("Home");
      }
    } catch (error) {
      setInitialRouteName("Home");
    }
  };
  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Routes} />
          </Stack.Navigator>
        </>
      )}
      <Toast visibilityTime={2000} />
    </NavigationContainer>
  );
}