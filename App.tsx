import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button,ScrollView,StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from './types/taskType';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

export default function App() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])


  const addTodo = () => {
    const newTodo = { id: Date.now().toString(), title: text, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo])
    setText('')
  }

  useEffect(() => {
  const load = async () => {
    try {
      const todo = await AsyncStorage.getItem("Todo")
      if (todo !== null) {
        setTodos(JSON.parse(todo))
      }
    } catch (err) {
    }
  };

  load()
}, [])
  useEffect(()=>{
    const save =async() => {
    try{
      await AsyncStorage.setItem("Todo",JSON.stringify(todos))
    } catch(err){
    }
  }
    save()
  },[todos])

  return (
    <View style={styles.container}>
      <Text>Todos</Text>
      <TodoInput addTodo={addTodo}/>
      <ScrollView>
        <TodoList todos={todos} setTodos={setTodos}/>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:50
  },
  addRow:{
    flexDirection:'row'
  },
  uncompletedTask:{
    textDecorationLine: 'line-through'
  }
});
