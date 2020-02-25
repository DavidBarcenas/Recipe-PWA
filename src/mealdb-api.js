const baseUrl = 'https://www.themealdb.com/api/json/v1/1';

export default { getLatest };

async function getLatest() {
  const request = await fetch(`${baseUrl}/search.php?f=b`);
  const data = await request.json();
  let recipes = [];

  if (data.meals) {
    recipes = data.meals.map(m => normalizeMeal(m));
  }
  return recipes;
}

function normalizeMeal(meal) {
  const newMeal = {};

  newMeal.id = meal.idMeal;
  newMeal.name = meal.strMeal;
  newMeal.img = meal.strMealThumb;
  newMeal.category = meal.strCategory;
  newMeal.tags = meal.strTags ? meal.strTags.split(',') : [];
  newMeal.ingredients = [];
  newMeal.url = meal.strSource;
  newMeal.instructions = meal.strInstructions
    .split('\n')
    .filter(i => i.trim() !== '');

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] !== '' || meal[`strMeasure${i}`] !== '') {
      newMeal.ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`]
      });
    }
  }

  return newMeal;
}
