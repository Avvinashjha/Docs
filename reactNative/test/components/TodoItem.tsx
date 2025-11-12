import { BasicTodo } from "@/types/todo";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: BasicTodo;
  onToggle: (id: string ) => void;
  onDelete: (id: string ) => void;
}
const TodoItem = ({ item, onToggle, onDelete }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <Text style={[styles.text, item.completed && styles.completed]}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={styles.delete}>x</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  text: {
    fontSize: 18,
  },
  delete: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default TodoItem;
