import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import Home from "../screens/Home/Home";
import Cart from "../screens/Cart/Cart";
import Account from "../screens/Profile/Account";
import Library from "../screens/Library/Library";
import Menu from "../screens/Menu/Menu";
import HeaderProfile from "../components/HeaderProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderLeft from "../components/HeaderLeft";



const Tab = createBottomTabNavigator();

const BottomTab = ({navigation}) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    authUser();
  }, [user]);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setUser(userData)
        } else {
          navigation.navigate("Login")
        }
      } else {
        navigation.navigate("Login")
      }
    } catch (error) {
      navigation.navigate("Login")
    }
  };
  const handleAccount = () => {
    if (user) {
      
      navigation.openDrawer()
    }else{
      navigation.navigate("Login")
    }
  }
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.tertiary,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
       
          elevation: 0,
          backgroundColor: "#fff",
          height: 70,
          zIndex: 1,
          borderTopColor: "#fff",
          ...styles.shadow,
        },
        headerRight: () => <HeaderProfile />,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <MaterialCommunityIcons name="home" color={color} size={size} />
              <Text
                style={{
                  color: focused ? COLORS.tertiary : "#748c94",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
 
 <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Ionicons name="cart-outline" color={color} size={size} />
              <Text
                style={{
                  color: focused ? COLORS.tertiary : "#748c94",
                }}
              >
                Cart
              </Text>
            </View>
          ),
        }}
      />
 <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
           <TouchableOpacity onPress={handleAccount}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
                width: 55,
                height: 55,
                backgroundColor: COLORS.tertiary,
                borderRadius: 30,
                marginBottom: 70
              }}
            >
              <MaterialCommunityIcons name="account-circle-outline" color={COLORS.white} size={28} />
        
            </View>
            </TouchableOpacity>
          ),
        
        }}
      />
   <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Ionicons name="book-outline" color={color} size={size} />
              <Text
                style={{
                  color: focused ? COLORS.tertiary : "#748c94",
                }}
              >
                Library
              </Text>
            </View>
          ),
        }}
      />
         <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Ionicons name="menu" color={color} size={size} />
              <Text
                style={{
                  color: focused ? COLORS.tertiary : "#748c94",
                }}
              >
                Menu
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});