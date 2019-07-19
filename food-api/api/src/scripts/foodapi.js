// Once you have retrieved all of the foods from your own Food API, display each one of them in the DOM. Create an HTML representation of each food which will display the name of the food, its type, and its ethnicity.

// Create a DOM element in your index.html with a class of foodList.
// Create a function which returns a string template. The template is the HTML representation for a food item.
// Create a function that inserts an HTML representation of a food into the DOM

const foodFactory = (food) => {
    return `
        <section class="food">
            <h1>${food.name}</h1>
            <p>Category: ${food.category}</p>
            <p>Ethnicity: ${food.ethnicity}</p>
        </section>
    `
}

const addFoodToDom = (foodAsHTML) => {
    const foodContainer = document.querySelector(".foodList")
    foodContainer.innerHTML += foodAsHTML
}

fetch("http://localhost:8088/foods")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
        })
    })