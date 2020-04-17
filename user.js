const userAPI = "http://localhost:3000/users";
const userContainer = document.querySelector("#user-container");
const userFavContainer = document.querySelector("#user-favourites");
const animatedCocktail = document.querySelector(".wrapper")
let currentUser;

const landingPage = () => {
	const welcomeMessage = document.createElement("p");
	welcomeMessage.innerText = "Welcome!"

	userContainer.append(welcomeMessage);
	createUser();
	// logInUser();


};

const createUser = () => {
	const userMessage = document.createElement("p");
	userMessage.innerText = "Create a Username";

	const userForm = document.createElement("form");
	const userInput = document.createElement("input");
	userInput.name = "username";
    const submitButton = document.createElement("button")
    submitButton.innerText = "Enter"
	userForm.addEventListener("submit", (event) => {
		event.preventDefault();
		userFormSubmit(userInput);
	});
	userForm.append(userInput, submitButton);
	userContainer.append(userMessage, userForm);
};

const userFormSubmit = (userInput) => {
	const newUser = {
		username: userInput.value,
	};
	currentUser = newUser;

	const configObject = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(newUser),
	};
	fetch(userAPI, configObject)
		.then((res) => res.json())
		.then((user) => {
			currentUser = user;
			console.log(currentUser);
		});
	userContainer.innerText = ""
    animatedCocktail.remove()
    ini();
};

const userCocktails = (user, newCocktail, userCocktail) => {
	const allCocktailButton = document.createElement("button")
	allCocktailButton.innerText = "All Cocktails"

	allCocktailButton.addEventListener("click", () => {
		userFavContainer.innerText = "";
		ini();
	});
    const headerChecker = document.querySelector(".favs");
	if (headerChecker.innerHTML !== "") {
		headerChecker.innerHTML = "";
	}
	const userFavHeader = document.createElement("h1");
	userFavHeader.innerText = `${user.username}'s Favourites!`;

	// user.cocktails is in a different format to cocktailsAPI
	fetch(`${userAPI}/${user.id}`)
		.then((res) => res.json())
		.then((user) => {
			fetch(cocktailsAPI)
				.then((resp) => resp.json())
				.then((cocktails) => {
					if (user.cocktails.length > 1) {
						const userCocktailIDs = user.cocktails.map(
							(cocktail) => cocktail.id
						);
						const formatCocktails = cocktails.filter((cocktail) =>
							userCocktailIDs.includes(cocktail.id)
						);
						

						formatCocktails.forEach((cocktail) => {
							renderCocktail(cocktail);
                            renderNote(cardList, user, userCocktail);
                            console.log(userCocktail)
						});
					} else {
						const formatCocktail = cocktails.filter(
							(cocktail) => cocktail.id === user.cocktails[0].id
						);
						

						renderCocktail(formatCocktail[0]);
						renderNote(cardList, user, userCocktail);
					}
				});
		});
    userFavContainer.append(userFavHeader, allCocktailButton);

    
};

const handleNotePatch = (cocktailNote, user, userCocktail) => {

    
    const configObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            notes: cocktailNote.value
            
        })
    }
    console.log(postFavAPI, userCocktail.id)
    fetch(`${postFavAPI}/${userCocktail.id}`, configObject)
    .then(resp => resp.json())
    .then(user_cocktail => {
		for (let i = 0; i < user.user_cocktails.length; i++ ) {	
			cocktailNote.innerText = `${user.user_cocktails[i].notes}`
		console.log(user)
		}
		
		
	})
}

const handleDeleteFav = (noteDiv, cardList, userCocktail) => {
	fetch(`${postFavAPI}/${userCocktail.id}`, {
		method: "DELETE"
	}).then(() => noteDiv.remove())
	.then(() => cardList.removeChild(cardList.childNodes[0]))
	
}




landingPage();
