import { Component } from "react";
import "./ItemAddForm.css";

export default class ItemAddForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control form"
          onChange={this.onLabelChange}
          placeholder="What needs to be done"
          value={this.state.label}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => this.props.onItemAdded("Hello world")}
        >
          Add Item
        </button>
      </form>
    );
  }
}
