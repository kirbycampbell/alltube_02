import React, { Component } from "react";

export default class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }

  // Changes name in state
  handleChange(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  //This creates new Todo Item
  async submit() {
    const { onCreate } = this.props;
    var input = {
      name: this.state.name,
      description: this.state.description
    };
    console.log(input);
    await onCreate({ input });
  }

  render() {
    return (
      <div>
        <input
          name="name"
          placeholder="name"
          onChange={ev => {
            this.handleChange("name", ev);
          }}
        />
        <input
          name="description"
          placeholder="description"
          onChange={ev => {
            this.handleChange("description", ev);
          }}
        />
        <button onClick={this.submit.bind(this)}>Add</button>
      </div>
    );
  }
}
