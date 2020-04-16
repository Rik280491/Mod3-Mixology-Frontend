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
	userContainer.remove()
    animatedCocktail.remove()
    ini();
};

const userCocktails = (user, newCocktail, userCocktail) => {
    
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
                            renderNote(cardList, userCocktail);
                            console.log(userCocktail)
						});
					} else {
						const formatCocktail = cocktails.filter(
							(cocktail) => cocktail.id === user.cocktails[0].id
						);
						

						renderCocktail(formatCocktail[0]);
						renderNote(cardList, userCocktail);
					}
				});
		});
    userFavContainer.append(userFavHeader);

    
};

const handleNotePatch = (cocktailNote, userCocktail) => {

    
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
    .then(userCocktail => console.log(userCocktail))
}



landingPage();
