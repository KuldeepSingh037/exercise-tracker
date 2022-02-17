import React, { Component } from "react";
import axios from "axios";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
    };
    console.log(user);

    try {
      axios.post("http://localhost:5000/users/add", user).then((res) => {
        console.log(res.data);
      });
    } catch (err) {
      console.log("error occurred: " + err);
    }

    this.setState({
      username: "",
    });

    window.location="/create"
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username:&nbsp;</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleChange}
              name="username"
              value={this.state.username}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
