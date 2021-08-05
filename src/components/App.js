import "./App.css";
import { Component } from "react";
import ItemStatusFilter from "./itemStatusFilter/ItemStatusFilter";
import AppHeader from "./appHeader/AppHeader";
import CurrentDate from "./currentDate/CurrentDate";
import SearchPanel from "./searchPanel/SearchPanel";
import ToDoList from "./toDoList/ToDoList";
import ItemAddForm from "./itemAddForm/ItemAddForm";
import { v4 } from "uuid";

class App extends Component {
  state = {
    toDoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesom App"),
      this.createTodoItem("Have a Lanch"),
    ],
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: v4(),
    };
  }

  deletItem = (id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      // toDoData.splice(idx, 1); - нельзя менять state
      const newArray = [...toDoData.slice(0, idx), ...toDoData.slice(idx + 1)];

      return {
        toDoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newTodo = this.createTodoItem(text);
    this.setState(({ toDoData }) => {
      const newArray = [...toDoData, newTodo];
      return {
        toDoData: newArray,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState(({ toDoData }) => {
      return {
        toDoData: this.toggleProperty(toDoData, id, "important"),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ toDoData }) => {
      return {
        toDoData: this.toggleProperty(toDoData, id, "done"),
      };
    });
  };

  render() {
    const { toDoData } = this.state;
    const doneCount = toDoData.filter((el) => el.done).length;
    const todoCount = toDoData.length - doneCount;
    return (
      <div className="todo-app">
        <CurrentDate />
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <ToDoList
          todos={toDoData}
          onDeleted={this.deletItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}

export default App;
