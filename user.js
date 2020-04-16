const  userAPI = "http://localhost:3000/users"
const userContainer = document.querySelector("#user-container")
const userFavContainer = document.querySelector("#user-favourites")
let currentUser; 

const landingPage = () => {
   const welcomeMessage = document.createElement("p")
    welcomeMessage.innerText = "Mixology...."

    userContainer.append(welcomeMessage)
    createUser();
    // logInUser();
}




const createUser = () => {
const userMessage = document.createElement("p")
userMessage.innerText = "Create a Username"

const userForm = document.createElement("form")
const userInput = document.createElement("input")
userInput.name = "username"

userForm.addEventListener("submit", event => {
    event.preventDefault();
    userFormSubmit(userInput)
})
userForm.append(userInput)
userContainer.append(userMessage, userForm)


}

  



const userFormSubmit = userInput => {
    const newUser = {
        username: userInput.value
    }
    currentUser = newUser
    
    const configObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newUser)
      };
      fetch(userAPI, configObject)
        .then(res => res.json())
        .then(user => {
            currentUser = user 
            console.log(currentUser)
        })
    userContainer.innerText = ""   
    ini();
}


const userCocktails = (user, cocktail) => {
   console.log(user, cocktail)
    const headerChecker = document.querySelector(".favs")
    if (headerChecker.innerHTML !== "") {
        headerChecker.innerHTML = ""
    }
    const userFavHeader = document.createElement("h1")
    userFavHeader.innerText = `${user.username}'s Favourites!`
    renderCocktail(cocktail)

    // We want to render cocktails that are in usercocktails with this user id

    // notes for each cocktail? usercocktail comments column


    userFavContainer.append(userFavHeader)
}





landingPage()
