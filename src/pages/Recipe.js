import React, { Component } from 'react';
import mealdb from '../mealdb-api';
import Helmet from 'react-helmet';
import Loading from '../components/Loading';

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = { recipe: null, isLoading: true };
  }

  async componentDidMount() {
    let recipe;
    try {
      recipe = await mealdb.getRecipe(this.props.match.params.id);
    } catch (error) {
      console.error('Single recipe error', error);
      recipe = null;
    }

    this.setState({ recipe, isLoading: false });
  }

  render() {
    const { recipe, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (recipe === null) {
      return <h2>An error ocurred.</h2>;
    }

    return (
      <>
        <Helmet>
          <title>{recipe.name}</title>
        </Helmet>
        <div className='recipe'>
          <div className='recipe-hero'>
            <img src={recipe.img} alt={recipe.name} />
          </div>

          <div className='recipe-description'>
            <h1>{recipe.name}</h1>
            <span className='recipe-category'>{recipe.category}</span>

            <div className='recipe-ingredients'>
              <h2>Ingredients:</h2>
              <div className='ingredients-list'>
                <ul>
                  {recipe.ingredients.length > 0 &&
                    recipe.ingredients.map((ingredient, idx) => {
                      if (idx <= Math.floor(recipe.ingredients.length / 2)) {
                        return (
                          <li key={idx}>
                            <p>
                              {ingredient.ingredient}{' '}
                              <span>{ingredient.measure}</span>
                            </p>
                          </li>
                        );
                      }
                      return [];
                    })}
                </ul>
                <ul>
                  {recipe.ingredients.length > 0 &&
                    recipe.ingredients.map((ingredient, idx) => {
                      if (idx > Math.floor(recipe.ingredients.length / 2)) {
                        return (
                          <li key={idx}>
                            <p>
                              {ingredient.ingredient}{' '}
                              <span>{ingredient.measure}</span>
                            </p>
                          </li>
                        );
                      }
                      return [];
                    })}
                </ul>
              </div>
            </div>

            <div className='recipe-instructions'>
              <h2>Instructions:</h2>
              <ul>
                {recipe.instructions.length > 0 &&
                  recipe.instructions.map((instruction, idx) => (
                    <li key={idx}>
                      <span>{idx + 1}.</span>
                      <p>{instruction}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
