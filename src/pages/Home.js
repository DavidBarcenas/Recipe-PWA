import React, { Component } from 'react';
import mealdb from '../mealdb-api';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      isLoading: true
    };
  }

  async componentDidMount() {
    let recipeslist;
    try {
      recipeslist = await mealdb.getLatest();
    } catch (error) {
      console.error('Error:', error);
      recipeslist = null;
    }

    this.setState({ recipes: recipeslist, isLoading: false });
  }

  render() {
    const { recipes, isLoading } = this.state;
    // console.log(recipes);
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}
