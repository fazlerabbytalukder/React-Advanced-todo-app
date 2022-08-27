import { useEffect, useState } from 'react';
import './App.css';
import Form from './component/Form';
import TodoList from './component/TodoList';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  //run once when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    // console.log('hay');
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
    
      default:
        setFilteredTodos(todos);
        break;
    }
  }



  // save to local storage as we dont build backend for save data 
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
      </header>
      <Form todos={todos} setTodos={setTodos} setInputText={setInputText} inputText={inputText} status={status} setStatus={setStatus}></Form>
      <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}></TodoList>
    </div>
  );
}

export default App;
