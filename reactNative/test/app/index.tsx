import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import TodoInput from "../components/TodoInput";
import { BasicTodo } from "../types/todo";
import { nanoid } from "nanoid/non-secure";
import TodoItem from "../components/TodoItem";

export default function Index() {
  const [todos, setTodos] = useState<BasicTodo[]>([]);

  function addTodo(title: string) {
    const newTodo: BasicTodo = {
      id: nanoid(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <TodoInput onAdd={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem item={item} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fafafa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
