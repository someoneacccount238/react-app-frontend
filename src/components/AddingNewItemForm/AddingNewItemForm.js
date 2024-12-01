import React, { Component } from "react";
import "./AddingNewItemForm.css";
import Form from "./Form";
import Meal from "./Meal";

class AddingNewItemForm extends Component {
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
      <div className="container3">
        <div className="jumbotron">
          <h2>Новый продукт</h2>
          <hr className="hrForm"/>
          <Form onsubmit={this.addMeal} date={this.props.date} />
        </div>
      </div>
    );
  }
}

export default AddingNewItemForm;
