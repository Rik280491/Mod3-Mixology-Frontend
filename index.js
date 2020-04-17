const cocktailsAPI = "http://localhost:3000/cocktails";
const combinationsAPI = "http://localhost:3000/combinations";

const cardList = document.querySelector(".cards-list");
const cocktailFilterNav = document.querySelector(".product-filter");

const ini = () => {
	fetch(cocktailsAPI)
		.then((resp) => resp.json())
		.then((cocktails) => {
            renderCocktails(cocktails);
            
})};

const renderCocktails = (cocktails) => {
    cocktails.forEach((cocktail) => 
    renderCocktail(cocktail));
};

const renderCocktail = (cocktail) => {
	const card = document.createElement("div");
	card.className = "card";

	const cardImageDiv = document.createElement("div");
	cardImageDiv.className = "card_image";
	const cardImage = document.createElement("img");
	cardImage.src = cocktail.img_url;
	cardImageDiv.append(cardImage);

	const cardTitleDiv = document.createElement("div");
	cardTitleDiv.className = "card_title title-white";
	const cardTitle = document.createElement("h5");

	cardTitle.innerText = cocktail.name;
	cardTitleDiv.append(cardTitle);

	const cardDes = document.createElement("div")
	cardDes.className = "des"
	const desUL = document.createElement("ul")
	cocktail.ingredients.forEach(ingredient => {
		let ingredientItem = document.createElement("li")
		ingredientItem.innerText = ingredient.name
		desUL.append(ingredientItem)
	});
	cardDes.append(desUL)

	card.addEventListener("click", () => {
		cardList.innerHTML = "";
		renderShowPage(cocktail);
	});

	card.append(cardImageDiv, cardTitleDiv);
    cardList.append(card);
    

};


const renderNote = (cardList, user, userCocktail) => {
    console.log(user)
    const cocktailNote = document.createElement("textarea")
	
	
	// for (let i = 0; i < user.user_cocktails.length; i++ ) {	
	// cocktailNote.innerText = `${user.user_cocktails[i].notes}`
	// }
	// debugger

    
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Remove from Favourites!"
	const saveNoteButton = document.createElement("button")
	saveNoteButton.innerText = "Save"
	const noteDiv = document.createElement("div")
	noteDiv.append(cocktailNote, deleteButton, saveNoteButton)
    cardList.append(noteDiv)

    saveNoteButton.addEventListener("click", () => {
		console.log(cocktailNote)
		
        handleNotePatch(cocktailNote, user, userCocktail)
    })

    deleteButton.addEventListener("click", () => {
        handleDeleteFav(noteDiv, cardList, userCocktail);
    })

}


const filterCocktails = () => {
	fetch(cocktailsAPI)
		.then((resp) => resp.json())
		.then((cocktails) => {
			// FILTER BY NAME
			const cocktailNameArray = cocktails.map((cocktail) => cocktail.name);

			const cocktailFilter = document.querySelector("#cocktail-filter");

			cocktailFilter.options[cocktailFilter.options.length] = new Option(
				"All Cocktails"
			);
			for (index in cocktailNameArray) {
				cocktailFilter.options[cocktailFilter.options.length] = new Option(
					cocktailNameArray[index]
				);
			}

			cocktailFilter.addEventListener("change", () => {
				cardList.innerText = "";
				const filterValue = cocktailFilter.value;

				if (filterValue === "All Cocktails") {
					renderCocktails(cocktails);
				} else {
					const targetCocktail = cocktails.filter(
						(cocktail) => cocktail.name === filterValue
					);
					renderCocktail(targetCocktail[0]);
				}
			});
			filterCocktailsIng(cocktails);
		});
};

const filterCocktailsIng = (cocktails) => {
	fetch(combinationsAPI)
		.then((resp) => resp.json())
		.then((combinations) => {
			const ingredientsArray = combinations
				.map((combination) => combination.ingredient.name)
				.sort();

			const uniqIngredientsArray = [...new Set(ingredientsArray)];

			const ingredientFilter = document.querySelector("#ingredient-filter");

			ingredientFilter.options[ingredientFilter.options.length] = new Option(
				"Filter By Ingredient"
			);

			for (index in uniqIngredientsArray) {
				ingredientFilter.options[ingredientFilter.options.length] = new Option(
					uniqIngredientsArray[index]
				);
			}
			filterEventHandler(combinations, ingredientFilter, cocktails);
		});
};

const filterEventHandler = (combinations, ingredientFilter, cocktails) => {
	ingredientFilter.addEventListener("change", () => {
		cardList.innerText = "";
		const ingredientFilterValue = ingredientFilter.value;

		if (ingredientFilterValue === "Filter By Ingredient") {
			renderCocktails(cocktails);
		} else {
			const targetIngredient = combinations.filter(
				(combination) => combination.ingredient.name === ingredientFilterValue
			);
			const targetCocktail = targetIngredient.map(
				(combination) => combination.cocktail.id)
                
            const formatTargetCocktail = cocktails.filter(cocktail => targetCocktail.includes(cocktail.id))
                console.log(formatTargetCocktail)
        
			if (formatTargetCocktail.length > 1) {
				formatTargetCocktail.forEach((cocktail) => renderCocktail(cocktail));
			} else {
                renderCocktail(formatTargetCocktail[0]);
                
			}
		}
	});
};

// ini();
filterCocktails();
