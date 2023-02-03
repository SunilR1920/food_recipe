const searchBtn = document.getElementById('search-btn');
const meallist = document.getElementById('meal');
const mealDerailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMeallist);
meallist.addEventListener('click', getMealrecipe);
recipeCloseBtn.addEventListener('click', () =>{
    mealDerailsContent.parentElement.classList.remove('showRecipe');
});

// default meal list function
function getDefaultMeallist() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian`)
        .then(respons => respons.json())
        .then(data => {
            let html = '';
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class="meal-item" data-id = "${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}"alt="Single Fish">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>`
                });
                meallist.classList.remove('notFound');
            }
            else {
                html += `<p>Sorry! We didn't found ${searchInputTxt} </p>`
                meallist.classList.add('notFound');
            }
            meallist.innerHTML = html;
        })
}

// default meal list function call
getDefaultMeallist()

// get meal list that matches with the ingredients

function searchSelect(inputtext) {
    let text = 'i=chicken_breast';
    if (inputtext === 'fish') {
        text = 'c=Seafood'
    }
    else if (inputtext === 'egg' || inputtext === 'beef') {
        text = 'i=chicken_breast';
    }
    else {
        text = `i=${inputtext}`
    }
    return text
}

function getMeallist() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${searchSelect(searchInputTxt)}`)
        .then(respons => respons.json())
        .then(data => {
            let html = '';
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class="meal-item" data-id = "${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}"alt="Single Fish">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>`
                });
                meallist.classList.remove('notFound');
            }
            else {
                html += `<p>Sorry! We didn't found ${searchInputTxt} </p>`
                meallist.classList.add('notFound');
            }
            meallist.innerHTML = html;
        })
}



function getMealrecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(respons => respons.json())
            .then(data => mealRecipeModel(data.meals));
    }
}


function mealRecipeModel(meal) {
    meal = meal[0];
    let html = `<h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instruction: </h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="Bangada">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>`;

    mealDerailsContent.innerHTML = html;
    mealDerailsContent.parentElement.classList.add('showRecipe');
}
