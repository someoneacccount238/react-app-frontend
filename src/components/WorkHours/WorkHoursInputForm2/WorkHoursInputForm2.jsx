import React, { Component } from "react";
import "./WorkHoursInputForm2.css";
import Form from "./Form";
import Input from "./Input";

class WorkHoursInputForm2 extends Component {
  state = {
    meals: [],
  };

  addMeal = (meal) => {
    this.setState({
      meals: [meal],
    });
  };

  onDelete = (id) => {
    this.setState({
      meals: this.state.meals.filter((meal) => meal.id !== id),
    });
  };

  render() {
    return (
      <div className="container4">
        <div className="jumbotron">
          <h2>
            workHours for {String(this.props.date).slice(0, 3)}{" "}
            {String(this.props.date).slice(8, 10)}
          </h2>
          <hr />
          <Form onsubmit={this.addMeal} date={this.props.date} />
          <table className="table">
            <thead>
              <tr>
                <th>Прием пищи</th>
                <th>Рабочие часы</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Всего:</td>
                <td>
                  <span role="img">🍎</span>
                  {this.state.meals.reduce(
                    (totalworkHours, meal) => totalworkHours + meal.workHours,
                    0
                  )}
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default WorkHoursInputForm2;
