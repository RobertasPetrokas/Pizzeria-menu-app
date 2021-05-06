var pizzaList = JSON.parse(sessionStorage.getItem("pizza_list"));
var pizzaName = document.getElementById("pizzaName");
var pizzaPrice = document.getElementById("pizzaPrice");
var pizzaHeat = document.getElementById("pizzaHeat");
var pizzaHeatOutput = document.getElementById("heatOutput");
var pizzaAdditionalInfo = document.getElementById("additionalInfo");
var pizzaPhoto = document.getElementById("pizzaPhoto");
pizzaPhoto.value = 0;

var toppingList = document.getElementById("toppingList");
var pizzaToppings = document.getElementById("pizzaToppings");
var toppings = [];


function savePizza () {

    if (pizzaName.value === "") {
        alert("Please enter pizza name!");
        return;
    } else if (pizzaList !== null) {
        var isDuplicate = false;
        pizzaList.forEach(pizza => {
            if (pizza.name === pizzaName.value) {
                alert(pizza.name + " is already in the menu!");
                isDuplicate = true;
            }
        });
    }

    if(isDuplicate) return;

    if (pizzaPrice.value === "") {
        alert("Please enter the price!");
        return;
    } 
    else if (pizzaPrice.value <= 0) {
        alert("Price must be positive number!");
        return;
    }
    else if (toppings.length < 2) {
        alert("Choose at least 2 toppings!");
        return;
    };



    var pizza = {
        name: pizzaName.value,
        price: pizzaPrice.value,
        heat: pizzaHeat.value,
        toppings: toppings,
        photo: pizzaPhoto.value,
        additionalInfo: pizzaAdditionalInfo.value
    };

    if (pizzaList === null) {
        sessionStorage.setItem("pizza_list", JSON.stringify([pizza]));
    } else {
        sessionStorage.setItem("pizza_list", JSON.stringify([...pizzaList, pizza]));
    }

    document.getElementById("addForm").reset();
    pizzaHeatOutput.innerHTML = "0";
    toppings = [];
    toppingList.innerHTML = "";
    pizzaPhoto.src = "./img/0.png";
    pizzaPhoto.value = 0;
}


function addTopping () {

    if (pizzaToppings.value !== "") {

        toppings.push(pizzaToppings.value);
        if (toppings.length === 1) {
            toppingList.innerHTML = "Chosen toppings: " + pizzaToppings.value;
        } else {
            toppingList.innerHTML += (", " + pizzaToppings.value);
        }
        pizzaToppings.value = "";
    }
}

pizzaHeat.oninput = function () {
    pizzaHeatOutput.innerHTML = this.value;
}

function prevPhoto () {
    pizzaPhoto.value--;
    if (pizzaPhoto.value < 0) pizzaPhoto.value = 10;
    pizzaPhoto.src = "./img/" + pizzaPhoto.value + ".png";
}

function nextPhoto () {
    pizzaPhoto.value++;
    if (pizzaPhoto.value > 10) pizzaPhoto.value = 0;
    pizzaPhoto.src = "./img/" + pizzaPhoto.value + ".png";
}