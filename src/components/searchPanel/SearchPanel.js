import { Component } from "react";
import "./SearchPanel.css";

class SearchPanel extends Component {
  state = {
    term: "",
  };

  onSerchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render() {
    return (
      <input
        type="text"
        placeholder="type to search"
        className="form-control search-input"
        value={this.state.term}
        onChange={this.onSerchChange}
      />
    );
  }
}
export default SearchPanel;
