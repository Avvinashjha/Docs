import React, {useState} from "react";

import { View, Text, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
interface propsType {
start: number | 0
}
export default function Counter({start}: propsType ){
    const [count, setCount] = useState(start);
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Counter App</Text>
          <Text style={styles.counter}>{count}</Text>
          <View style={styles.buttonRow}>
            <CustomButton variant="danger" icon="remove"  onPress={() => setCount(prev => prev - 1)} />
            <CustomButton variant="primary" icon="refresh"  onPress={()=> setCount(start)}/>
            <CustomButton variant="secondary" icon="add"  onPress={() => setCount(prevCount => prevCount + 1 )}/>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 20
  },
  counter:{
    fontSize: 48,
    marginBottom: 20
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10
  }
})