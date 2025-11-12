import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

interface Props {
  onAdd: (title: string) => void;
}

const TodoInput = ({ onAdd }: Props) => {
  const [text, setText] = useState("");

  function handleAdd() {
    if (text.trim().length === 0) return;
    onAdd(text);
    setText("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter todo..."
        style={styles.input}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
});

export default TodoInput;
