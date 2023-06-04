import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ flexDirection: "row", gap: 10 }} onPress={() => navigation.goBack()}>
    <View style={{flexDirection: "row", alignItems:"center"}}>
        <Ionicons name="chevron-back" color={COLORS.tertiary} size={26} />
        <Text>Back</Text></View>
    </TouchableOpacity>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({});