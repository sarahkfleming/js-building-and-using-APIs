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
            <p>Countries where sold: ${food.countries}</p>
            <p>Ingredients: ${food.ingredients}</p>
            <p>Energy: ${food.energy}</p>
            <p>Fat per serving: ${food.fat}</p>
            <p>Sugar per serving: ${food.sugar}</p>
        </section>
    `
}

const addFoodToDom = (foodAsHTML) => {
    const foodContainer = document.querySelector(".foodList")
    foodContainer.innerHTML += foodAsHTML
}

// fetch("http://localhost:8088/foods")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         parsedFoods.forEach(food => {
//             const foodAsHTML = foodFactory(food)
//             addFoodToDom(foodAsHTML)
//         })
//     })

// Your job is to query the Open Food Facts API for each of your products, and list the following additional information.

// Ingredients
// Country of origin
// Calories per serving
// Fat per serving
// Sugar per serving

fetch("http://localhost:8088/foods")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "No Ingredients Listed"
                    }
                    if (productInfo.product.countries) {
                        food.countries = productInfo.product.countries
                      } else {
                        food.countries = "No country is brave enough to sell this"
                      }
                    if ("nutriments" in productInfo.product && "energy" in productInfo.product.nutriments) {
                        food.energy = `${productInfo.product.nutriments.energy} kj`
                      } else {
                        food.energy = "(Information not found)"
                      }
                    if ("nutriments" in productInfo.product && "fat_serving" in productInfo.product.nutriments) {
                        food.fat = `${productInfo.product.nutriments.fat_serving} g`
                    } else {
                        food.fat = "(Information not found)"
                    }
                    if ("nutriments" in productInfo.product && "sugars_serving" in productInfo.product.nutriments) {
                        food.sugar = `${productInfo.product.nutriments.sugars_serving} g`
                    } else {
                        food.sugar = "(Information not found)"
                        }

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representation to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })