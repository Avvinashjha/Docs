import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent, ViewStyle, TextStyle } from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
type Variant = "primary" | "secondary" | "danger";
type Props = {
    title?: string;
    onPress: (event: GestureResponderEvent) => void;
    icon?: keyof typeof MaterialIcons.glyphMap;
    color?: string,
    variant?: Variant
}


const CustomButton = ({ title, onPress, icon, color = "#4a90e2", variant}: Props) => {
    const getVariantStyle = (variant?: Variant): ViewStyle => {
        if(!variant) return {};
        return styles[variant] as ViewStyle;
    }
    return (
        <TouchableOpacity style={[styles.button, color ? {backgroundColor: color}: {}, getVariantStyle(variant)]} onPress={onPress}>
            <View style={styles.row}>
                {icon && <MaterialIcons name={icon} size={24} color={"white"} style={styles.icon}/>}
                {title && <Text style={styles.text}>{title}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 5,
  } as ViewStyle,

  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  } as TextStyle,

  row: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,

  icon: {
    marginRight: 5,
  } as TextStyle,

  primary: {
    backgroundColor: "#4a90e2",
  } as ViewStyle,

  secondary: {
    backgroundColor: "#c5f0c5ff",
  } as ViewStyle,

  danger: {
    backgroundColor: "#f76c6c",
  } as ViewStyle,
});


export default CustomButton;