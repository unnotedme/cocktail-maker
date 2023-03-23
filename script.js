let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let getInfo = () => {
    let userInp = document.getElementById("user-inp").value;
    if (userInp.length == 0) {
        result.innerHTML = `<h3 class="msg">Opsie... I guess you got so drunk that you forgot to write the drink you want! Maybe it is time to stop!</h3>`;
    } else {
        fetch(url + userInp)
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("user-inp").value = "";
                console.log(data);
                console.log(data.drinks[0]);
                let myDrink = data.drinks[0];
                console.log(myDrink.strDrink);
                console.log(myDrink.strDrinkThumb);
                console.log(myDrink.strInstructions);
                let count = 1;
                let ingredients = [];
                for (let i in myDrink) {
                    let ingredient = "";
                    let measure = "";
                    if (i.startsWith("strIngredient") && myDrink[i]) {
                        ingredient = myDrink[i];
                        if (myDrink[`strMeasure` + count]) {
                            measure = myDrink[`strMeasure` + count];
                        } else {
                            measure = "";
                        }
                        count += 1;
                        ingredients.push(`${measure} ${ingredient}`);
                    }
                }
                console.log(ingredients);
                result.innerHTML = `
      <img src=${myDrink.strDrinkThumb}>
      <div class="info">
        <h1>${myDrink.strDrink}</h1>
        <h3>INGREDIENTS</h3>
        <ul class="ingredients"></ul>
        <p>${myDrink.strInstructions}</p>
      </div>
      `;
                let ingredientsCon = document.querySelector(".ingredients");
                ingredients.forEach((item) => {
                    let listItem = document.createElement("li");
                    listItem.innerText = item;
                    ingredientsCon.appendChild(listItem);
                });
            })
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Opsie... I guess you got so drunk that you searched for a invalid input! Maybe it is time to stop! </h3>`;
            });
    }
};
window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);