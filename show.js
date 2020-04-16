postFavAPI = "http://localhost:3000/user_cocktails";


const body = document.querySelector("body");
const showPageContainer = document.querySelector("#show-page-container");

const renderShowPage = (cocktail) => {
	fetch(`${cocktailsAPI}/${cocktail.id}`)
		.then((resp) => resp.json())
		.then(() => cocktailShowPage(cocktail));
};

const cocktailShowPage = (cocktail) => {
	const allCocktailsButton = document.createElement("button");
	allCocktailsButton.innerText = "All Cocktails";

	allCocktailsButton.addEventListener("click", () => {
		showPageContainer.innerText = "";
		const userFavs = document.querySelector(".favs")
		userFavs.innerHTML = ""
		ini();
	});
	const cocktailName = document.createElement("h2");
	cocktailName.innerText = cocktail.name;

	const cocktailImg = document.createElement("img");
	cocktailImg.src = cocktail.img_url;
	cocktailImg.height = "300";
	cocktailImg.className = "image"
	const ingMeasureUl = document.createElement("ul");
    
  
    console.log(cocktail)
	for (let i = 0; i < cocktail.ingredients.length; i++) {
		const cocktailIngredients = document.createElement("li");
		cocktailIngredients.innerText = cocktail.ingredients[i].name + " - " + cocktail.measures[i].amount;
		cocktailIngredients.style.alignItems = "center"
		cocktailIngredients.style.justifyContent = "center"
		cocktailIngredients.style.display = "flex"
		ingMeasureUl.append(cocktailIngredients);
	}

	const cocktailMethod = document.createElement("p");
	cocktailMethod.innerText = cocktail.method;

	const favButton = document.createElement("button");
	favButton.innerText = "Add to Favourites";

	const favText = document.createElement("p");
	favText.innerText = `This cocktail has been favourited ${cocktail.users.length} times!`;

	favButton.addEventListener("click", (event) => {
		event.preventDefault();
        favSubmit(cocktail, showPageContainer);
        
    });

	cocktailName.style.alignItems = "center"
	cocktailName.style.justifyContent = "center"
	cocktailName.style.display = "flex"

	cocktailImg.style.display = "block"
	cocktailImg.style.marginLeft = "auto"
	cocktailImg.style.marginRight = "auto"

	cocktailMethod.style.alignItems = "center"
	cocktailMethod.style.justifyContent = "center"
	cocktailMethod.style.display = "flex"

	favButton.style.display = "block"
	favButton.style.marginLeft = "auto"
	favButton.style.marginRight = "auto"

	favText.style.alignItems = "center"
	favText.style.justifyContent = "center"
	favText.style.display = "flex"

	showPageContainer.append(
		allCocktailsButton,
		cocktailName,
		cocktailImg,
		ingMeasureUl,
		cocktailMethod,
        favButton,
		favText
	);
	
	relatedNews(cocktail);
};





const relatedNews = (cocktail) => {
	const drinkAware = document.createElement("img");
	drinkAware.src = "./images/Five signs self isolation.png";
	drinkAware.height = "200";
	drinkAware.width = "200";
	drinkAware.style.display = "block"
	drinkAware.style.marginLeft = "auto"
	drinkAware.style.marginRight = "auto"
	showPageContainer.append(drinkAware);
};


const favSubmit = (cocktail, showPageContainer) => {
    
	const configObject = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			user_id: currentUser.id,
			cocktail_id: cocktail.id,
		}),
	};

	fetch(postFavAPI, configObject)
        .then((resp) => resp.json())
        .then(userCocktail => {
            const newCocktail = userCocktail.cocktail
            const user = userCocktail.user 
             showPageContainer.innerText = ""
           return userCocktails(user, newCocktail, userCocktail)
            
       
            
        })
        
    };


