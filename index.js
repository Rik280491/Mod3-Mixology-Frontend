cocktailsAPI = "http://localhost:3000/cocktails";
combinationsAPI = "http://localhost:3000/combinations";

const cardList = document.querySelector(".cards-list");
const cocktailFilterNav = document.querySelector(".product-filter");

const ini = () => {
	fetch(cocktailsAPI)
		.then((resp) => resp.json())
		.then((cocktails) => renderCocktails(cocktails));
};

const renderCocktails = (cocktails) => {
	cocktails.forEach((cocktail) => renderCocktail(cocktail));
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

	card.addEventListener("click", () => {
		cardList.innerHTML = "";
		renderShowPage(cocktail);
	});

	card.append(cardImageDiv, cardTitleDiv);
	cardList.append(card);
};

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
					cocktails.forEach((cocktail) => renderCocktail(cocktail));
				} else {
					const targetCocktail = cocktails.filter(
						(cocktail) => cocktail.name === filterValue
					);
					renderCocktail(targetCocktail[0]);
				}
			});
			// FILTER BY MAIN INGREDIENT. SPLIT THIS INTO TWO FUNCTIONS
            
            fetch(combinationsAPI).then(resp => resp.json())
            .then(combinations => { 
              const ingredientsArray = combinations.map(combination => combination.ingredient.name).sort()
            
            
             
            
            const uniqIngredientsArray = [...new Set(ingredientsArray)];

			const spiritFilter = document.querySelector("#spirit-filter");

			for (index in uniqIngredientsArray) {
				spiritFilter.options[spiritFilter.options.length] = new Option(
					uniqIngredientsArray[index]
				);
			}

			spiritFilter.addEventListener("change", () => {
				cardList.innerText = "";
				const spiritFilterValue = spiritFilter.value;

				if (spiritFilterValue === "Filter By Spirit") {
					cocktails.forEach((cocktail) => renderCocktail(cocktail));
				} else {
					const targetSpirit = combinations.filter(
                        combination => combination.ingredient.name === spiritFilterValue
                    );
                    const targetSpiritCocktail = targetSpirit.map(combination => combination.cocktail) 
                    
					if (targetSpiritCocktail.length > 1) {
						targetSpiritCocktail.forEach((cocktail) =>
							renderCocktail(cocktail)
						);
					} else {
						renderCocktail(targetSpiritCocktail[0]);
					}
				}
			});
        })
    });
};

ini();
filterCocktails();
