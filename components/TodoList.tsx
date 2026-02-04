import React from 'react';
import { View } from 'react-native';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: { id: string; title: string; completed: boolean }[]
  setTodos: React.Dispatch<React.SetStateAction<{ id: string; title: string; completed: boolean }[]>>
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <View>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </View>
  )
}

export default TodoList;