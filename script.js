let modal = document.querySelector(".modal");
let btn = document.querySelector(".cart-btn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const cards = document.querySelectorAll(".card");
const cart = document.querySelector(".cart");
const addButtons = document.querySelectorAll(".add");
const totalElement = document.querySelector(".total"); 
const selectedItems = {};

function handleCardClick(event) {
  const card = event.currentTarget;
  const itemId = card.id;
  const itemImg = card.querySelector("img").src;
  const itemName = card.querySelector(".desc").textContent;
  const itemPrice = parseFloat(card.querySelector(".price").textContent); 

  if (selectedItems[itemId]) {
    selectedItems[itemId].count++;
  } else {
    selectedItems[itemId] = {
      name: itemName,
      image: itemImg,
      price: itemPrice,
      count: 1,
    };
  }

  updateCart();
}

function updateCart() {
    cart.innerHTML = '';
    let total = 0; 

    for (const itemId in selectedItems) {
      const item = selectedItems[itemId];

      cart.innerHTML += `<div class="cart-card">
                    <img src="${item.image}" alt="${item.name}" />
                    <h6 class="cart-desc">${item.name}</h6>
                    <h6 class="cart-price">$${item.price}</h6>
                    <div class="quantity-container">
                      <button class="subt-btn">-</button>
                      <span class="quantity-text">${item.count}</span>
                      <button class="add-btn">+</button>
                    </div>
                </div>`
      

        const quantityText = document.querySelector(".quantity-text"); 
        const addButton = document.querySelector(".add-btn");
        const subtractButton = document.querySelector(".subt-btn");

        addButton.addEventListener("click", () => {
            addItem(itemId);
        });

        subtractButton.addEventListener("click", () => {
            removeItem(itemId);
        });

        total += item.price * item.count; 
    }

    totalElement.textContent = `${total.toFixed(2)}`; 
}

function addItem(itemId) {
    if (selectedItems[itemId]) {
        selectedItems[itemId].count++;
    }
    updateCart();
}

function removeItem(itemId) {
    if (selectedItems[itemId]) {
        selectedItems[itemId].count--;
        if (selectedItems[itemId].count <= 0) {
            delete selectedItems[itemId];
        }
    }
    updateCart();
}

cards.forEach((card) => {
    card.addEventListener("click", handleCardClick);
});


