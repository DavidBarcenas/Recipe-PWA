import React, { Component } from 'react';
import mealdb from '../mealdb-api';
import Helmet from 'react-helmet';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';

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
    if (isLoading) {
      return <Loading />;
    }
    return (
      <>
        <Helmet>
          <title>Recipes</title>
        </Helmet>

        <div className='recipies'>
          {recipes &&
            recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
      </>
    );
  }
}
