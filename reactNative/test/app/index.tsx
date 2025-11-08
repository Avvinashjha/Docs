import Counter from "@/components/Counter";
import React from "react";
import { View, StyleSheet} from "react-native";


export default function Index() {
  return (
    <View style={styles.container}>
     <Counter start={10}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
