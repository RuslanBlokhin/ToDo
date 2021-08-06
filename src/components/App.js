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
    toDoData: [],
    term: "",
    filter: "all", //
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

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const { toDoData, term, filter } = this.state;
    const visibleItem = this.filter(this.search(toDoData, term), filter);
    const doneCount = toDoData.filter((el) => el.done).length;
    const todoCount = toDoData.length - doneCount;
    return (
      <div className="todo-app">
        <CurrentDate />
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <ToDoList
          todos={visibleItem}
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
