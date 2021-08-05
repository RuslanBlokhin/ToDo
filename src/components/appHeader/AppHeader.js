import "./AppHeader.css";

const AppHeader = ({ toDo, done }) => {
  return (
    <div className="app-header d-flex">
      <h1>ToDo List</h1>
      <h2>
        {toDo} More ToDo, {done} Done
      </h2>
    </div>
  );
};

export default AppHeader;
