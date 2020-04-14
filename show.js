

const body = document.querySelector("body")
const showPageContainer = document.querySelector("#show-page-container")

const renderShowPage = (cocktail) => {
    fetch(`${cocktailsAPI}/${cocktail.id}`).then(resp => resp.json())
    .then(() => cocktailShowPage(cocktail))
}

const cocktailShowPage = cocktail => {
    const allCocktailsButton = document.createElement("button")
    allCocktailsButton.innerText = "All Cocktails"

    allCocktailsButton.addEventListener("click", () => {
        // showpages are stacking up when you nav back and forth 
        showPageContainer.innerText = ""
        ini();
    })
    const cocktailName = document.createElement("h1")
    cocktailName.innerText = cocktail.name

    const cocktailImg = document.createElement("img")
    cocktailImg.src = cocktail.img_url 
    cocktailImg.height = "500"

    const cocktailMethod = document.createElement("p")
    cocktailMethod.innerText = cocktail.method 

    const favButton = document.createElement("button")
    favButton.innerText = "Add to Favourites"
    
    showPageContainer.append(allCocktailsButton, cocktailName, cocktailImg, cocktailMethod, favButton)

    similarCocktails(cocktail)
    relatedNews(cocktail)
}


const similarCocktails = (cocktail) => {
    const similarCocktailsTitle = document.createElement("h3")
    // cocktail.ingredients
    similarCocktailsTitle.innerText = "Try these if you're a fan of (this spirit)" 
    


    showPageContainer.append(similarCocktailsTitle)


}


const relatedNews = cocktail => {
    const drinkAware = document.createElement("img")
    drinkAware.src = "./images/Five signs self isolation.png"
    drinkAware.height = "300"
    drinkAware.width = "300"
    
    
    
    
    showPageContainer.append(drinkAware)
}