import React from 'react';
import { Link } from 'react-router-dom';
import './styles/RecipeCard.css';

const RecipeCard = props => {
  const { recipe } = props;
  return (
    <Link to={`/recipe/${recipe.id}`} className='recipeItem'>
      <figure>
        <img src={recipe.img} alt={recipe.name} />
        <figcaption>
          <h2>{recipe.name}</h2>
        </figcaption>
      </figure>
    </Link>
  );
};

export default RecipeCard;
