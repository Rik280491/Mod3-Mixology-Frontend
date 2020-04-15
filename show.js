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
		ini();
	});
	const cocktailName = document.createElement("h1");
	cocktailName.innerText = cocktail.name;

	const cocktailImg = document.createElement("img");
	cocktailImg.src = cocktail.img_url;
	cocktailImg.height = "500";
	const ingMeasureUl = document.createElement("ul");
    
	cocktail.ingredients.forEach((ingredient) => {
		const cocktailIngredients = document.createElement("li");
		cocktailIngredients.innerText = ingredient.name;
		ingMeasureUl.append(cocktailIngredients);
	});
	cocktail.measures.forEach((measure) => {
		const cocktailMeasure = document.createElement("li");
		cocktailMeasure.innerText = measure.amount;
		ingMeasureUl.append(cocktailMeasure);
	});

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
    

	showPageContainer.append(
		allCocktailsButton,
		cocktailName,
		cocktailImg,
		ingMeasureUl,
		cocktailMethod,
        favButton,
		favText
	);

	// similarCocktails(cocktail);
	relatedNews(cocktail);
};

// const similarCocktails = (cocktail) => {
// 	const similarCocktailsTitle = document.createElement("h3");
// 	// cocktail.ingredients
//    const filterIng = cocktail.ingredients[0].name
//     similarCocktailsTitle.innerText = `Try these if you're a fan of ${filterIng}!`;
//     fetch(cocktailsAPI)
// 		.then((resp) => resp.json())
// 		.then((cocktails) => {
//         cocktails.filter(cocktail => cocktail.ingredients[0].name === filterIng )
//         renderCocktail(cocktail)

//         })
//     showPageContainer.append(similarCocktailsTitle);

// };

const relatedNews = (cocktail) => {
	const drinkAware = document.createElement("img");
	drinkAware.src = "./images/Five signs self isolation.png";
	drinkAware.height = "300";
	drinkAware.width = "300";
	showPageContainer.append(drinkAware);
};

console.log(currentUser)
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
            userCocktails(user, newCocktail)
            
        })
        
    };


