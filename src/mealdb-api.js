const baseUrl = 'https://www.themealdb.com/api/json/v1/1';

export default { getLatest };

async function getLatest() {
  const request = await fetch(`${baseUrl}/search.php?f=c`);
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

  return newMeal;
}
