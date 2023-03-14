import logo from './logo.svg';
 import './App.css';
import './bootstrap.css';
import { Component } from 'react';
import FirstComponent from './components/learning-examples/FirstComponent'
import CounterButton from './components/Counter/CounterButton';
import TodoApp from './components/todo/TodoApp';
function App() {
  return (
    <div className="App">
      My Hello World
      {/* <Counter></Counter> */}
      <TodoApp></TodoApp>
    </div>
  );
}

export default App;





function ThirdComponent() {
    return (
      <div className="thirdComponent">
        My third World
      </div>
    );
}