import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: new Number(),
      date: new Date(),
      users: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/" + this.props.match.params.id)
      .then((res) => {
        this.setState(
          {
            username: res.data.username,
            description: res.data.description,
            duration: Number(res.data.duration),
            date: new Date(res.data.date),
          },
          console.log(res.data)
        );
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map((user) => user.username),
          });
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }

  handleChange(e) {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  onDateChange(date) {
    console.log("date: ", date);
    this.setState({ date: date });
  }
  handleSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: Number(this.state.duration),
      date: this.state.date,
    };
    console.log(exercise);
    axios
      .post(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    // window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select
              //  ref="userInput"
              required
              name="username"
              className="form-control"
              value={this.state.username}
              onChange={this.handleChange}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              name="description"
              className="form-control"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes)</label>
            <input
              type="text"
              required
              name="duration"
              className="form-control"
              value={this.state.duration}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onDateChange}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercise;
