

const body = document.querySelector("body")

const renderShowPage = (cocktail) => {
    fetch(`${cocktailsAPI}/${cocktail.id}`).then(resp => resp.json())
    .then(() => cocktailShowPage(cocktail))
}

const cocktailShowPage = cocktail => {
    const allCocktailsButton = document.createElement("button")
    allCocktailsButton.innerText = "All Cocktails"

    allCocktailsButton.addEventListener("click", () => {
        // showpages are stacking up when you nav back and forth 
        ini();
    })
    const cocktailName = document.createElement("h1")
    cocktailName.innerText = cocktail.name

    const cocktailImg = document.createElement("img")
    cocktailImg.src = cocktail.img_url 
    cocktailImg.height = "500"

    const cocktailMethod = document.createElement("p")
    cocktailMethod.innerText = cocktail.method 

    
    body.append(allCocktailsButton, cocktailName, cocktailImg, cocktailMethod)
}
