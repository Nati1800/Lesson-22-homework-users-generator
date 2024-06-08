const cardsDiv = document.querySelector(".cards-div")
const spinner = document.querySelector("#spinner")

function init() {

    document.querySelector("#showUsers").addEventListener("click", async () => {
        clearUsers()
        spinner.style.display = "block"
        try {
            let usersArray = await getUsersArray(10)
            console.log(usersArray[0])
            usersArray.forEach((user) => {
                drawSingleUserCard(user)
            })
        } catch (error) {
            alert("Error")
        } finally {
            spinner.style.display = "none"
        }
    })


}


async function usersApi() {
    const data = await fetch("https://randomuser.me/api/")
    const result = await data.json()
    return result.results
}

async function getUsersArray(numOfUsers) {
    let usersArr = []
    for (let index = 0; index < numOfUsers; index++) {
        const singleUser = await usersApi()
        usersArr.push(singleUser[0])
    }
    return usersArr
}


function drawSingleUserCard(user) {
    const card = document.createElement("div")
    card.classList.add("card")

    const userImage = document.createElement("img")
    userImage.src = user.picture.large
    userImage.classList.add("card-img-top")
    userImage.style.height = "13rem"

    const userDetails = document.createElement("p")
    userDetails.innerText = `User Name: ${user.name.first} ${user.name.last},
    Gender: ${user.gender}, Location: ${user.location.city}, Postcode: ${user.location.postcode}
    Email: ${user.email} `
    userDetails.classList.add("user-details")

    const userCountryButton = document.createElement("button")
    userCountryButton.innerText = `Country: ${user.location.country}`
    userCountryButton.classList.add("country-button","btn","btn-danger")
    userCountryButton.addEventListener("click", async ()=>{
        countryLoader.style.display="block"
        try {
            const country = await getCountryApi(user.location.country)
            console.log(country)
            const countryImage = document.createElement("img")
            countryImage.src = country.flags.png
            countryImage.classList.add("countryImage")
            card.append(countryImage)
        } catch (error) {
            alert("no country flag found")
        }finally{
            countryLoader.style.display="none"
        }
    })

    const countryLoader = document.createElement("div")
    countryLoader.classList.add("loader")

    card.append(userImage, userDetails, userCountryButton, countryLoader)
    cardsDiv.append(card)
}

function clearUsers() {
    cardsDiv.innerHTML = ""
}

async function getCountryApi(country) {
    if (typeof country !== "string") {
        return
    }
    const result = await fetch(`https://restcountries.com/v3.1/name/${country}`)
    const countryObj = await result.json()
    return countryObj[0]
}

async function countryApi() {

}


init()