const baseUrl = 'https://www.themealdb.com/api/json/v1/1';

export default { getLatest, getRecipe };

async function getLatest() {
  const request = await fetch(`${baseUrl}/search.php?f=s`);
  const data = await request.json();
  let recipes = [];

  if (data.meals) {
    recipes = data.meals.map(m => normalizeMeal(m));
  }
  return recipes;
}

async function getRecipe(id) {
  const request = await fetch(`${baseUrl}/lookup.php?i=${id}`);
  const data = await request.json();

  return data.meals.length > 0 ? normalizeMeal(data.meals[0]) : [];
}

function normalizeMeal(meal) {
  const newMeal = {};

  newMeal.id = meal.idMeal;
  newMeal.name = meal.strMeal;
  newMeal.origin = meal.strArea;
  newMeal.img = meal.strMealThumb;
  newMeal.category = meal.strCategory;
  newMeal.youtube = meal.strYoutube;
  newMeal.tags = meal.strTags ? meal.strTags.split(',') : [];
  newMeal.ingredients = [];
  newMeal.url = meal.strSource;
  newMeal.instructions = meal.strInstructions
    .split('\n')
    .filter(i => i.trim() !== '');

  for (let i = 1; i <= 20; i++) {
    if (
      meal[`strIngredient${i}`] !== '' &&
      meal[`strIngredient${i}`] != null &&
      meal[`strMeasure${i}`] !== '' &&
      meal[`strMeasure${i}`] != null
    ) {
      newMeal.ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`]
      });
    }
  }

  return newMeal;
}
