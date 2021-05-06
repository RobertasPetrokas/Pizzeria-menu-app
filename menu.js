var pizzaList = JSON.parse(sessionStorage.getItem("pizza_list"));
var deleteBtn = document.getElementsByClassName("deleteButton");
var pizzaHTML = document.getElementById("pizzaMenu");


function createSortBtn(type, btnDiv) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("btn-group");
    btnDiv.appendChild(btn);

    btn.addEventListener("click", (() => {
        pizzaList = sort(type);
        pizzaHTML.innerHTML = "";
        renderList();
    }))
    btn.appendChild(document.createTextNode("Sort by " + type));
}

function sort(prop) {
    pizzaList.sort((a, b) => {
        if (a[prop].toLowerCase() < b[prop].toLowerCase()) return -1;
        else if (a[prop].toLowerCase() > b[prop].toLowerCase()) return 1;
        else return 0;
    });
    return pizzaList;
}

function renderList() {

    // Sort Buttons
    var btnDiv = document.createElement("div");

    createSortBtn("name", btnDiv);
    createSortBtn("price", btnDiv);
    createSortBtn("heat", btnDiv);
    // btnDiv.classList.add('radio');
    pizzaHTML.appendChild(btnDiv);

    pizzaList.forEach(pizza => {

        var pizzaProps = document.createElement("li");
        pizzaProps.classList.add("box");

        // Name
        pizzaProps.appendChild(document.createElement("br"));
        pizzaProps.appendChild(document.createTextNode("Name: " + pizza.name))

        // Heat (Chilli peppers)
        if (pizza.heat > 0) {
            var heat = document.createElement("img")
            heat.src = "./img/chili" + pizza.heat + ".png"
            heat.classList.add("chilli")
            pizzaProps.appendChild(heat);
        }

        // Price
        var price = document.createElement("p");
        price.innerText = "Price: " + pizza.price + " €";
        pizzaProps.appendChild(price);



        // Toppings
        var toppings = document.createElement("p");
        toppings.innerText = "Toppings: " + pizza.toppings;
        pizzaProps.appendChild(toppings);

        // Pizza photo
        if (pizza.photo > 0) {
            var img = document.createElement("img");
            img.src = "./img/" + pizza.photo + ".png";
            img.classList.add("pizzaMenuPhoto");
            pizzaProps.appendChild(img);
        }

        // Additional Information
        if (pizza.additionalInfo !== "") {
            var additionalInfo = document.createElement("p");
            additionalInfo.innerText = "Additional information: " + pizza.additionalInfo;
            pizzaProps.appendChild(additionalInfo);
            pizzaProps.appendChild(document.createElement("br"));
        }

        // Delete Button
        var deleteBtn = document.createElement("button");
        deleteBtn.appendChild(document.createTextNode("Delete"));
        deleteBtn.classList.add("deleteButton");
        pizzaProps.appendChild(document.createElement('br'));
        pizzaProps.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            if (confirm("Are you sure that you want to delete this pizza from the menu?")) {
                var newMenu = pizzaList.filter(pizzaToRemove => {
                    return pizzaToRemove.name != pizza.name
                })
                sessionStorage.setItem("pizza_list", JSON.stringify(newMenu));
                pizzaHTML.removeChild(pizzaProps);
            }
        });

        pizzaHTML.appendChild(pizzaProps);

    });
    
}


if (pizzaList !== null) {
    pizzaList = sort("name");
    renderList();
};

