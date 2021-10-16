import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => {
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |
    </td>
  </tr>;
};

class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
    };
    this.deleteExercise = this.deleteExercise.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:5000/exercises/").then((res) => {
      this.setState({ exercises: res.data }).catch((error) =>
        console.log(error)
      );
    });
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/execises/" + id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    this.setState({
      exercises: this.state.exercises.filter((element) => element._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercises.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={this.deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}

export default ExercisesList;
